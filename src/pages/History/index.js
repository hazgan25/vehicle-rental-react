import React, { useState, useEffect } from 'react'
import Main from '../../components/Main'
import styles from './index.module.scss'

import Swal from 'sweetalert2'
import { Modal, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import vehicleNotFound from '../../assets/img/vehiclenotfound.png'
import CardVehicle from '../../components/CardVehicles'
import vehicleImgDefault from '../../assets/img/vehicle-default.png'
import searchIcon from '../../assets/svg/search.svg'
import arrowIcon from '../../assets/svg/arrowBack.svg'

import { useLocation, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { vehicleSearchFilter } from '../../modules/utils/vehicle'
import { listHistoryUser, editHistory, delHistoryUser } from '../../modules/utils/history'
import formatRupiah from '../../modules/helper/formatRupiah'

const History = () => {
    const state = useSelector(state => state)
    const navigate = useNavigate()
    const location = useLocation()

    const { auth } = state
    const { token } = auth

    const [search, setSearch] = useState('')
    const [by, setBy] = useState('id')
    const [order, setOrder] = useState('desc')
    const [page, setPage] = useState(1)
    const [checkDel, setCheckDel] = useState([])
    const [returnEditUser, setReturnEditUser] = useState('')
    const [iseReturnEdit, setIsRetunEdit] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const [rating, setRating] = useState('')
    const [input, setInput] = useState('')

    const [newArrival, setNewArrival] = useState([])
    const [historyUser, setHistoryUser] = useState([])
    const [meta, setMeta] = useState([])

    const ulrHistoryUser = `${location.search}&limit=3&page=${page}`
    const NewUlrHistoryUser = `/history?search=${search}&by=${by}&order=${order}`

    useEffect(() => {
        if (by === 'id') {
            setOrder('asc')
        } else {
            setOrder('desc')
        }
        if (token) {
            listHistoryUser(token, ulrHistoryUser)
                .then((res) => {
                    setHistoryUser(res.data.result.data)
                    setMeta(res.data.result.meta)
                })
                .catch(({ ...err }) => {
                    console.log(err)
                })

            const limitArival = 2
            const urlNewArrival = `?search=&type=&location=&by=id&order=desc&limit=${limitArival}`

            vehicleSearchFilter(urlNewArrival)
                .then((res) => {
                    setNewArrival(res.data.result.data)
                })
                .catch(({ ...err }) => {
                    console.log(err)
                })
        }
    }, [token, ulrHistoryUser, by])

    const searchFilterHandler = () => {
        setPage(1)
        navigate(NewUlrHistoryUser)
        window.scrollTo(0, 0)
    }

    const AddEditRatingTestiHandler = () => {
        const body = {
            'rating': rating,
            'testimony': input
        }
        editHistory(token, body, returnEditUser)
            .then((res) => {
                setIsModal(false)
                setIsRetunEdit(false)
                Swal.fire(
                    'Succes Add Or Edit Rating & Testimony',
                    `${res.data.result.msg}`,
                    'success'
                )
                listHistoryUser(token, ulrHistoryUser)
                    .then((res) => {
                        setRating('')
                        setInput('')
                        setHistoryUser(res.data.result.data)
                        setMeta(res.data.result.meta)
                    })
                    .catch(({ ...err }) => {
                        console.log(err)
                    })
            })
            .catch(({ ...err }) => {
                toast.error(`${err.response.data.err}`, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
    }

    const checkDelHandler = (e) => {
        if (e.target.checked === true) setCheckDel([...checkDel, e.target.value])
        if (e.target.checked === false) {
            const arrCheck = [...checkDel]
            arrCheck.splice(e.target.checked, 1)
            setCheckDel(arrCheck)
        }
    }

    const modalDeleteItem = () => {
        if (checkDel.length === 0) {
            toast.error(`Have to choose first`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            setIsModal(true)
        }
    }

    const deleteItemHandler = () => {
        delHistoryUser(token, checkDel)
            .then((res) => {
                Swal.fire(
                    `Process Complete`,
                    `${res.data.result.msg}`,
                    'success'
                )
                setIsModal(false)
                listHistoryUser(token, ulrHistoryUser)
                    .then((res) => {
                        setHistoryUser(res.data.result.data)
                        setMeta(res.data.result.meta)
                    })
                    .catch(({ ...err }) => {
                        console.log(err)
                    })
            }).catch(({ ...err }) => {
                Swal.fire(
                    'There an error?',
                    `${err.response.data.err}`,
                    'error'
                )
                setIsModal(false)
            })
    }

    const viewMoreHandler = () => {
        navigate(`/view-more?search=&type=&location=&by=id&order=desc`)
    }

    const prevHandler = () => {
        if (meta.prev !== null) {
            setPage(page - 1)
            setCheckDel([])
            window.scrollTo(0, 0)
        }
    }
    const nextHandler = () => {
        if (meta.next !== null) {
            setPage(page + 1)
            setCheckDel([])
            window.scrollTo(0, 0)
        }
    }

    return (
        <Main>
            <main className={`container ${styles['top-history']}`}>
                {token ? (
                    <React.Fragment>
                        <article className={styles['flex-history']}>
                            <section className={styles['box-left']}>
                                <input type={'text'} placeholder='Search Histroy' className={styles['history-search']} onChange={e => setSearch(e.target.value)} />
                                <img src={searchIcon} alt='avatar' className={styles['search']} onClick={searchFilterHandler} />
                                <select className={styles['box-select']} defaultValue='' onChange={e => setBy(e.target.value)}>
                                    <option value={''} disabled>Sort</option>
                                    <option value={'id'}>Default</option>
                                    <option value={'types'}>Type</option>
                                    <option value={'id'}>Date Added</option>
                                    <option value={'vehicles'}>Name</option>
                                </select>
                                <button className={styles['btn-search']} onClick={searchFilterHandler}>Search</button>
                                <div style={{ marginTop: 23 }}>
                                    {historyUser.length > 0 ? (
                                        <React.Fragment>
                                            {Array.isArray(historyUser) && historyUser.length > 0 &&
                                                historyUser.map((data) => (
                                                    <React.Fragment key={data.id}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                                            <div>
                                                                <img src={`${process.env.REACT_APP_HOST}/${data.image}`} alt='' className={styles['img-history']} style={{ position: 'absolute', zIndex: 1 }} />
                                                                <img src={vehicleImgDefault} alt='' className={styles['img-history']} />
                                                            </div>
                                                            <div className={styles['box-text']}>
                                                                <div className={styles['text-bold']}>{data.name}</div>
                                                                <div className={styles['text-history']}>{data.renter_time}</div>
                                                                <div className={styles['text-bold']}>{`Pre Payment : Rp. ${formatRupiah(data.payment)}`}</div>
                                                                <div className={styles['text-history']} style={data.status === 'Not been returned' ? { color: 'red' } : { color: 'green' }}>{data.status}</div>
                                                            </div>
                                                            <button className={styles['btn-return']} disabled={data.status === 'Not been returned' ? true : false} onClick={() => {
                                                                setReturnEditUser(data.id)
                                                                setIsModal(true)
                                                                setIsRetunEdit(true)
                                                            }} >{data.rating === null ? 'Add Rating' : 'Edit Rating'}</button>
                                                            <input type={'checkbox'} className={styles['checkbox']} value={data.id} onChange={checkDelHandler} />
                                                        </div>
                                                    </React.Fragment>
                                                ))
                                            }
                                            <div className={styles['meta-flex']}>
                                                <div className={styles['flex-beetwen']}>
                                                    <button className={styles['btn-prev']} onClick={prevHandler}>Prev</button>
                                                    <h3 className={styles['page-text']}>{meta.page}</h3>
                                                    <button className={styles['btn-next']} onClick={nextHandler}>Next</button>
                                                </div>
                                            </div>
                                            <section className={styles['meta-flex']} style={{ marginTop: 23 }}>
                                                <p>{`Page ${meta.page} to remaining ${meta.totalPage - meta.page} from total page ${meta.totalPage}`}</p>
                                            </section>
                                            <button className={styles['btn-select-item']} onClick={modalDeleteItem}>Delete selected item</button>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}>
                                                <img alt='avatar' src={vehicleNotFound} className={styles['vehicle-notFound']} />
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}>
                                                </div>
                                            </div>
                                            <section
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}>
                                                <h5>Transaction history is still empty</h5>
                                            </section>
                                        </React.Fragment>
                                    )}
                                </div>
                            </section>
                            <section className={styles['box-new-arrival']}>
                                <div>
                                    <h5 style={{ textAlign: 'center', marginBottom: 23 }}>New Arrival</h5>
                                    {newArrival !== [] ? (
                                        <React.Fragment>
                                            {
                                                Array.isArray(newArrival) && newArrival.length > 0 &&
                                                newArrival.map((data) => (
                                                    <React.Fragment key={data.id}>
                                                        <CardVehicle
                                                            id={data.id}
                                                            image={data.image !== null ? data.image : vehicleImgDefault}
                                                            name={data.name}
                                                        />
                                                    </React.Fragment>
                                                ))
                                            }
                                            <p style={{ textAlign: 'center', marginTop: 83 }}>View More</p>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img src={arrowIcon} alt='avatar' className={styles['arrow-view-more']} onClick={viewMoreHandler} />
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <h5 style={{ textAlign: 'center' }}>Coming Soon</h5>
                                        </React.Fragment>
                                    )}
                                </div>
                            </section>
                        </article>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <section style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <img alt='avatar' src={vehicleNotFound} className={styles['vehicle-notFound']} />
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                            </div>
                        </section>
                        <section
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center'
                            }}>
                            <h5>Data history not found! please login first</h5>
                        </section>
                    </React.Fragment>
                )}

                <Modal show={isModal} onHide={() => {
                    setIsModal(false)
                    setIsRetunEdit(false)
                }} size='md' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-vcenter'>
                            {iseReturnEdit !== false ? 'Add Or Edit Rating' : 'Delete History'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {iseReturnEdit !== false ? (
                            <React.Fragment>
                                <label>
                                    <h5>Rating :</h5>
                                </label>
                                <select defaultValue={''} style={{
                                    marginLeft: 23,
                                    padding: 12,
                                    borderRadius: 10
                                }} onChange={e => setRating(e.target.value)}>
                                    <option value={''} disabled >Choose Rating</option>
                                    <option value={1} >1</option>
                                    <option value={2} >2</option>
                                    <option value={3} >3</option>
                                    <option value={4} >4</option>
                                    <option value={5} >5</option>
                                </select>
                                <h5 style={{ marginTop: 23 }}>Testimony :</h5>
                                <input type={'text'} style={{ width: '100%', height: 'auto' }} onChange={e => setInput(e.target.value)} />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <h6 style={{ textAlign: 'center' }}>Are you sure do you want to delete selected item?</h6>
                            </React.Fragment>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        {iseReturnEdit !== false ? (
                            <React.Fragment>
                                <Button className='btn-secondary w-25' onClick={() => {
                                    setIsModal(false)
                                    setIsRetunEdit(false)
                                }} >Cancel</Button>
                                <Button className='btn-warning w-25' onClick={AddEditRatingTestiHandler}>Yes</Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button className='btn-warning w-25' onClick={deleteItemHandler}>Yes</Button>
                                <Button className='btn-dark text-warning w-25' onClick={() => { setIsModal(false) }}>No</Button>
                            </React.Fragment>
                        )}
                    </Modal.Footer>
                </Modal>

                <ToastContainer
                    position="top-center"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

            </main>
        </Main>
    )
}

export default History
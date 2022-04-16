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

import { useSelector, useDispatch } from 'react-redux'
import { vehicleSearchFilter } from '../../modules/utils/vehicle'
import { listHistoryUser, returnEdit, delHistoryUser } from '../../modules/utils/history'
import formatRupiah from '../../modules/helper/formatRupiah'

import { listVehiclePopularAction, listVehicleCarAction, listVehicleMotorbikeAction, listVehicleBikeAction } from '../../redux/actions/listVehicles'
import { paramsPopulerVehicle, paramCarVehicle, paramMotorbikeVehicle, paramBikeVehicle } from '../../modules/helper/listVehicle'

const urlVehicles = process.env.REACT_APP_HOST + '/vehicles'
const ulrHistory = process.env.REACT_APP_HOST + '/history'

const History = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
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
    const [rating, setRating] = useState()
    const [input, setInput] = useState('')

    const [newArrival, setNewArrival] = useState([])
    const [historyUser, setHistoryUser] = useState([])
    const [meta, setMeta] = useState([])

    const ulrHistoryUser = `${ulrHistory}${location.search}&limit=3&page=${page}`
    const NewUlrHistoryUser = `/history?search=${search}&by=${by}&order=${order}`
    const urlNewArrival = `${urlVehicles}?search=&type=&location=&by=id&order=desc&limit=2&page=1`

    useEffect(() => {
        if (token) {
            listHistoryUser(token, ulrHistoryUser)
                .then((res) => {
                    setHistoryUser(res.data.result.data)
                    setMeta(res.data.result.meta)
                })
                .catch(({ ...err }) => {
                    console.log(err)
                })

            vehicleSearchFilter(urlNewArrival)
                .then((res) => {
                    setNewArrival(res.data.result.data)
                })
                .catch(({ ...err }) => {
                    console.log(err)
                })

            if (by === 'vehicles') {
                setOrder('asc')
            } else {
                setOrder('desc')
            }
        }
    }, [token, ulrHistoryUser, urlNewArrival, by])

    const searchFilterHandler = () => {
        setPage(1)
        navigate(NewUlrHistoryUser)
        window.scrollTo(0, 0)
    }

    const returnEditHandler = () => {
        const body = {
            'rating': rating,
            'testimony': input
        }
        returnEdit(token, body, returnEditUser)
            .then((res) => {
                setIsModal(false)
                setIsRetunEdit(false)
                Swal.fire(
                    'Succes Return Or Edit',
                    `${res.data.result.msg}`,
                    'success'
                )
                setTimeout(() => {
                    window.location.reload(false)
                }, 1500)
            })
            .catch(({ ...err }) => {
                console.log(err)
            })
    }

    const deleteItemHandler = () => {
        // dispatch(listVehiclePopularAction(paramsPopulerVehicle))
        // dispatch(listVehicleCarAction(paramCarVehicle))
        // dispatch(listVehicleMotorbikeAction(paramMotorbikeVehicle))
        // dispatch(listVehicleBikeAction(paramBikeVehicle))
        const body = {
            'id': checkDel
        }
        delHistoryUser(token, body)
            .then((res) => {
                console.log(res)
            })
            .catch(({ ...err }) => {
                console.log(err)
            })
    }

    const viewMoreHandler = () => {
        navigate(`/view-more?search=&type=&location=&by=id&order=desc`)
    }

    const prevHandler = () => {
        if (meta.prev !== null) {
            setPage(page - 1)
            window.scrollTo(0, 0)
        }
    }
    const nextHandler = () => {
        if (meta.next !== null) {
            setPage(page + 1)
            window.scrollTo(0, 0)
        }
    }

    console.log(iseReturnEdit)
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
                                    <option value={''} disabled>Filter</option>
                                    <option value={'create_at'}>Default</option>
                                    <option value={'types'}>Type</option>
                                    <option value={'create_at'}>Date Added</option>
                                    <option value={'vehicles'}>Name</option>
                                </select>
                                <button className={styles['btn-search']} onClick={searchFilterHandler}>Search</button>
                                <div style={{ marginTop: 23 }}>
                                    {historyUser !== [] ? (
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
                                                            <button className={styles['btn-return']} onClick={() => {
                                                                setReturnEditUser(data.id)
                                                                setIsModal(true)
                                                                setIsRetunEdit(true)
                                                            }} >{data.status === 'Not been returned' ? 'Return' : 'Edit Rating'}</button>
                                                            <input type={'checkbox'} value={data.id} onChange={e => setCheckDel(e.target.value)} />
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
                                            <button className={styles['btn-select-item']} onClick={deleteItemHandler}>Delete selected item</button>
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
                                                    }}
                                                >
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
                                justifyContent: 'center'
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
                            {iseReturnEdit !== false ? 'Return Or Edit Rating' : 'Delte History'}
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
                                <Button className='btn-warning w-25' onClick={returnEditHandler}>Yes</Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button className='btn-warning w-25'>Yes</Button>
                                <Button className='btn-dark text-warning w-25'>No</Button>
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
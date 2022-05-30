import React, { useState, useEffect } from 'react'
import Main from '../../components/Main'
import styles from './index.module.scss'

import Swal from 'sweetalert2'
import { Modal, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import vehicleNotFound from '../../assets/img/vehiclenotfound.png'
import searchIcon from '../../assets/svg/search.svg'

import { useLocation, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { listHistoryRenter, returnHistory, delHistoryRenter } from '../../modules/utils/history'
import formatRupiah from '../../modules/helper/formatRupiah'

const HistoryOrderRenter = () => {
    const state = useSelector(state => state)
    const navigate = useNavigate()
    const location = useLocation()

    const { auth } = state
    const { token } = auth

    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [by, setBy] = useState('id')
    const [order, setOrder] = useState('asc')
    const [historyRenter, setHistoryRenter] = useState([])
    const [metaRenter, setMetaRenter] = useState([])
    const [checkDelRenter, setCheckDelRenter] = useState([])
    const [page, setPage] = useState(1)
    const [isModal, setIsModal] = useState(false)
    const [dataReturn, setDatareturn] = useState('')
    const [isReturn, setIsReturn] = useState(false)

    const ulrHistoryRenter = `${location.search}&limit=5&page=${page}`
    const NewUlrHistoryRenter = `/history%20renter?search=${search}&filter=${filter}&by=${by}&order=${order}`

    useEffect(() => {
        if (by === 'id') {
            setOrder('desc')
        } else {
            setOrder('asc')
        }
        listHistoryRenter(token, ulrHistoryRenter)
            .then((res) => {
                console.log('ini res', res)
                setHistoryRenter(res.data.result.data)
                setMetaRenter(res.data.result.meta)
            })
            .catch(({ ...err }) => {
                console.log(err)
            })
    }, [token, ulrHistoryRenter, by])

    const searchFilterHandler = () => {
        setPage(1)
        navigate(NewUlrHistoryRenter)
        window.scrollTo(0, 0)
    }

    const prevHandler = () => {
        if (metaRenter.prev !== null) {
            setPage(page - 1)
            setCheckDelRenter([])
            window.scrollTo(0, 0)
        }
    }
    const nextHandler = () => {
        if (metaRenter.next !== null) {
            setPage(page + 1)
            setCheckDelRenter([])
            window.scrollTo(0, 0)
        }
    }

    const returnHandler = () => {
        returnHistory(token, dataReturn)
            .then((res) => {
                setIsModal(false)
                setIsReturn(false)
                Swal.fire(
                    'Success Return',
                    `${res.data.result.msg}`,
                    'success'
                )
                listHistoryRenter(token, ulrHistoryRenter)
                    .then((res) => {
                        setHistoryRenter(res.data.result.data)
                    })
                    .catch(({ ...err }) => {
                        console.log(err)
                    })
            })
            .catch(({ ...err }) => {
                Swal.fire(
                    'There an Error?',
                    `${err.response.data.err}`,
                    'error'
                )
                console.log(err)
            })
    }

    const checkDelHandler = (e) => {
        if (e.target.checked === true) setCheckDelRenter([...checkDelRenter, e.target.value])
        if (e.target.checked === false) {
            const arrCheck = [...checkDelRenter]
            arrCheck.splice(e.target.checked, 1)
            setCheckDelRenter(arrCheck)
        }
    }

    const modalDeleteItem = () => {
        if (checkDelRenter.length === 0) {
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
        delHistoryRenter(token, checkDelRenter)
            .then((res) => {
                Swal.fire(
                    'Process Complete',
                    `${res.data.result.msg}`,
                    'success'
                )
                setIsModal(false)
                listHistoryRenter(token, ulrHistoryRenter)
                    .then((res) => {
                        setHistoryRenter(res.data.result.data)
                    })
                    .catch(({ ...err }) => {
                        console.log(err)
                    })
            })
            .catch(({ ...err }) => {
                Swal.fire(
                    'There an Error?',
                    `${err.response.data.err}`,
                    'error'
                )
                setIsModal(false)
            })
    }

    return (
        <Main>
            <main className={`container ${styles['top-history']}`}>
                <h3 style={{ textAlign: 'center' }}>Data of Tenant</h3>

                <section>
                    <input type={'text'} placeholder='Search Histroy' className={styles['history-search']} onChange={e => setSearch(e.target.value)} />
                    <img src={searchIcon} alt='avatar' className={styles['search']} onClick={searchFilterHandler} />
                    <select style={{ marginRight: 23 }} className={styles['box-select']} defaultValue='' onChange={e => setFilter(e.target.value)}>
                        <option value={''} disabled>Filter</option>
                        <option value={''}>Default</option>
                        <option value={1}>Returned</option>
                        <option value={2}>Not Returned</option>
                    </select>
                    <select className={styles['box-select']} defaultValue='' onChange={e => setBy(e.target.value)}>
                        <option value={''} disabled>Sort</option>
                        <option value={'create_at'}>Default</option>
                        <option value={'types'}>Type</option>
                        <option value={'id'}>Date Added</option>
                        <option value={'vehicles'}>Name</option>
                    </select>
                    <button className={styles['btn-search']} onClick={searchFilterHandler}>Search</button>
                </section>

                <section style={{ marginTop: 23 }}>
                    {historyRenter.length > 0 ? (
                        <React.Fragment>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="table table-warning table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id. </th>
                                            <th scope="col">Vehicles</th>
                                            <th scope="col">Users</th>
                                            <th scope="col">Types</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Renter Time</th>
                                            <th scope="col">Setup Return</th>
                                            <th scope="col">Select Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(historyRenter) && historyRenter.length > 0 &&
                                            historyRenter.map((data) => (
                                                <React.Fragment key={data.id}>
                                                    <tr>
                                                        <th scope="row">{data.id}</th>
                                                        <td>{data.name}</td>
                                                        <td>{data.user}</td>
                                                        <td>{data.type}</td>
                                                        <td>{data.status}</td>
                                                        <td>{data.quantity}</td>
                                                        <td>{`Pre Payment : Rp. ${formatRupiah(data.payment)}`}</td>
                                                        <td>{data.renter_time}</td>
                                                        <td>
                                                            <button className={styles['btn-return']} style={data.status === 'Has been returned' ? { opacity: 0.5 } : {}}
                                                                onClick={() => {
                                                                    setDatareturn(data.id)
                                                                    setIsModal(true)
                                                                    setIsReturn(true)
                                                                }}>return vehicle</button>
                                                        </td>
                                                        <td className='text-center'>
                                                            <input type={'checkbox'} value={data.id} onChange={checkDelHandler} />
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles['meta-flex']}>
                                <div className={styles['flex-beetwen']}>
                                    <button className={styles['btn-prev']} onClick={prevHandler}>Prev</button>
                                    <h3 className={styles['page-text']}>{metaRenter.page}</h3>
                                    <button className={styles['btn-next']} onClick={nextHandler}>Next</button>
                                </div>
                            </div>
                            <section className={styles['meta-flex']} style={{ marginTop: 23 }}>
                                <p>{`Page ${metaRenter.page} to remaining ${metaRenter.totalPage - metaRenter.page} from total page ${metaRenter.totalPage}`}</p>
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
                                <h5>Transaction history is empty</h5>
                            </section>
                        </React.Fragment>
                    )}
                </section>

                <Modal show={isModal} onHide={() => {
                    setIsModal(false)
                    setIsReturn(false)
                }} size='md' arial-labelledby='contained-modal-title-vcenter' centered>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-vcenter'>
                            {isReturn !== false ? 'Return Vehicle' : 'Delete History'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isReturn !== false ? <h6>Are you sure to change the status of the vehicle being returned?</h6> : <h6>Are you sure do you want to delete selected item?</h6>}
                    </Modal.Body>
                    <Modal.Footer>
                        {isReturn !== false ? (
                            <React.Fragment>
                                <Button className='btn-secondary w-25' onClick={() => {
                                    setIsModal(false)
                                    setIsReturn(false)
                                }}>Cancel</Button>
                                <Button className='btn-warning w-25' onClick={returnHandler}>Yes</Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button className='btn-warning w-25' onClick={deleteItemHandler}>Yes</Button>
                                <Button className='btn-dark text-warning w-25' onClick={() => { setIsModal(false) }}>Cancel</Button>
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

export default HistoryOrderRenter
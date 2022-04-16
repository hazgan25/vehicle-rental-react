import React, { useState, useEffect } from 'react'
import Main from '../../components/Main'
import styles from './index.module.scss'

import vehicleNotFound from '../../assets/img/vehiclenotfound.png'
import CardVehicle from '../../components/CardVehicles'
import vehicleImgDefault from '../../assets/img/vehicle-default.png'
import searchIcon from '../../assets/svg/search.svg'
import arrowIcon from '../../assets/svg/arrowBack.svg'

import { useLocation, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { vehicleSearchFilter } from '../../modules/utils/vehicle'
import { listHistoryUser, delHistoryUser } from '../../modules/utils/history'
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
    const [by, setBy] = useState('create_at')
    const [order, setOrder] = useState('desc')
    const [page, setPage] = useState(1)
    const [checkDel, setCheckDel] = useState('')

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

    const deleteItemHandler = () => {
        // dispatch(listVehiclePopularAction(paramsPopulerVehicle))
        // dispatch(listVehicleCarAction(paramCarVehicle))
        // dispatch(listVehicleMotorbikeAction(paramMotorbikeVehicle))
        // dispatch(listVehicleBikeAction(paramBikeVehicle))
        const body = {
            'id': 1
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

    console.log(checkDel)
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
                                                            <button className={styles['btn-return']}>{data.status === 'Not been returned' ? 'Return' : 'Edit Rating'}</button>
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
            </main>
        </Main>
    )
}

export default History
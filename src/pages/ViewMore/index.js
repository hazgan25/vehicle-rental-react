import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'

import Main from '../../components/Main'
import searchIcon from '../../assets/svg/search.svg'
import CardVehicle from '../../components/CardVehicles'
import vehicleImgDefault from '../../assets/img/vehicle-default.png'
import vehicleNotFound from '../../assets/img/vehiclenotfound.png'

import { useLocation, useNavigate } from 'react-router-dom'
import { listVechileAction, listVehiclePopularAction } from '../../redux/actions/listVehicles'
import { getAllLocation } from '../../modules/utils/location'

import { useDispatch } from 'react-redux'
import { paramsPopulerVehicle } from '../../modules/helper/listVehicle'

const ViewMore = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const locationParams = useLocation()

    const [locationArr, setLocationArr] = useState([])
    const [vehicleArr, setVehileArr] = useState([])
    const [vehiclePage, setVehiclePage] = useState(1)
    const [meta, setMeta] = useState({})

    const [search, setSearch] = useState('')
    const [types, setTypes] = useState('')
    const [location, setLocation] = useState('')
    const [order, setOrder] = useState('id')
    const [sort, setSort] = useState('desc')

    const urlSearchFilter = locationParams.search + `&limit=12&page=${vehiclePage}`
    const newUrlSearchFilter = `/view-more?search=${search}&type=${types}&location=${location}&by=${order}&order=${sort}`
    const remamagingData = meta.totalData - 12 * vehiclePage

    useEffect(() => {
        dispatch(listVechileAction(urlSearchFilter))
            .then((res) => {
                setVehileArr(res.value.data.result.data)
                setMeta(res.value.data.result.meta)
            })
            .catch((err) => {
                if (err) {
                    dispatch(listVehiclePopularAction(paramsPopulerVehicle))
                        .catch(({ ...err }) => {
                            if (err) {
                                navigate('/error%20server')
                            }
                        })
                }
            })
    }, [urlSearchFilter, dispatch, navigate])

    useEffect(() => {
        getAllLocation()
            .then((res) => {
                setLocationArr(res.data.result)
            })
            .catch(({ ...err }) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        const { page } = meta
        setVehiclePage(page)
    }, [meta])

    const searchFilterHandler = () => {
        setVehiclePage(1)
        navigate(`${newUrlSearchFilter}`)
        window.scrollTo(0, 0)
    }

    const nextHandler = () => {
        if (meta.next !== null) {
            setVehiclePage(vehiclePage + 1)
            window.scrollTo(0, 0)
        }
    }

    const prevHandler = () => {
        if (meta.prev !== null) {
            setVehiclePage(vehiclePage - 1)
            window.scrollTo(0, 0)
        }
    }

    return (
        <Main>
            <main className={`container ${styles['top-view-more']}`}>
                <input type={'text'} placeholder='Search vehicle (ex. type vehicle, vehicle name, location name)' className={styles['search-vehicle']} onChange={e => setSearch(e.target.value)} />
                <img src={searchIcon} alt='avatar' className={styles['search']} onClick={searchFilterHandler} />

                <section className={`container-fluid ${styles['flex-search-filter']}`}>
                    <select className={styles['box-select']} defaultValue='' onChange={e => setTypes(e.target.value)}>
                        <option value={''} disabled>Choose Type Vehicle</option>
                        <option value={''}>All</option>
                        <option value={1}>Car</option>
                        <option value={2}>Motorbike</option>
                        <option value={3}>Bike</option>
                    </select>
                    <select className={styles['box-select']} defaultValue='' onChange={e => setLocation(e.target.value)}>
                        <option value={''} disabled>Choose Location</option>
                        <option value={''}>All</option>
                        {Array.isArray(locationArr) && locationArr.length > 0 &&
                            locationArr.map((data) => (
                                <React.Fragment key={data.id}>
                                    <option value={data.id}>{data.name}</option>
                                </React.Fragment>
                            ))
                        }
                    </select>
                    <select className={styles['box-select']} defaultValue='' onChange={e => setOrder(e.target.value)}>
                        <option value={''} disabled>Order</option>
                        <option value={'id'}>Default</option>
                        <option value={'name'}>Vehicles</option>
                        <option value={'locations'}>locations</option>
                        <option value={'rating'}>Ratings</option>
                    </select>
                    <select className={styles['box-select']} defaultValue='' onChange={e => setSort(e.target.value)}>
                        <option value={''} disabled>Sort</option>
                        <option value={'asc'}>Ascending</option>
                        <option value={'desc'}>Descending</option>
                    </select>
                </section>

                <button className={`mt-4 ${styles['btn-search-filter']}`} onClick={searchFilterHandler}>Search</button>

                {vehicleArr.length !== 0 ? (
                    <React.Fragment>
                        <p className={styles['data-vehicle']}>{`Total vehicle ${meta.totalData} remaining vehicle ${remamagingData < 0 ? 0 : remamagingData}`}</p>
                        <section className={`${styles['all-vehicle']}`}>
                            {Array.isArray(vehicleArr) && vehicleArr.length > 0 &&
                                vehicleArr.map((data) => (
                                    <React.Fragment key={data.id}>
                                        <div style={{ marginRight: 10 }}>
                                            <CardVehicle
                                                id={data.id}
                                                image={data.image !== null ? data.image : vehicleImgDefault}
                                                name={data.name}
                                            />
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </section>
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
                                <h5>Vehicle Not Found. . .</h5>
                            </div>
                        </section>
                    </React.Fragment>
                )}

                <section className={styles['meta-flex']}>
                    <div className={styles['flex-beetwen']}>
                        <button className={styles['btn-prev']} onClick={prevHandler}>Prev</button>
                        <h3 className={styles['page-text']}>{meta.page}</h3>
                        <button className={styles['btn-next']} onClick={nextHandler}>Next</button>
                    </div>
                </section>

                <section className={styles['meta-flex']} style={{ marginTop: 23 }}>
                    <p>{`Page ${vehiclePage} to remaining ${meta.totalPage - vehiclePage} from total page ${meta.totalPage}`}</p>
                </section>

            </main>
        </Main>
    )
}

export default ViewMore
import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'

import Main from '../../components/Main'
import searchIcon from '../../assets/svg/search.svg'
import CardVehicle from '../../components/CardVehicles'
import vehicleImgDefault from '../../assets/img/vehicle-default.png'
import vehicleNotFound from '../../assets/img/vehiclenotfound.png'

import { useNavigate, useLocation } from 'react-router-dom'
import { listVechileAction } from '../../redux/actions/listVehicles'
import { getAllLocation } from '../../modules/utils/location'


import { useDispatch } from 'react-redux'

const urlVehicles = process.env.REACT_APP_HOST + '/vehicles'

const ViewMore = () => {
    const dispatch = useDispatch()

    const [locationArr, setLocationArr] = useState([])
    const [vehicleArr, setVehileArr] = useState([])
    const [vehiclePage, setVehiclePage] = useState(1)
    const [meta, setMeta] = useState({})

    const locationParams = useLocation()
    const urlSearchFilter = urlVehicles + locationParams.search + `&limit=12&page=${vehiclePage}`

    useEffect(() => {
        dispatch(listVechileAction(urlSearchFilter))
            .then((res) => {
                setVehileArr(res.value.data.result.data)
                setMeta(res.value.data.result.meta)
            })
            .catch(({ ...err }) => {
                console.log(err)
            })

        getAllLocation()
            .then((res) => {
                setLocationArr(res.data.result)
            })
            .catch(({ ...err }) => {
                console.log(err)
            })
    }, [urlSearchFilter, dispatch])

    useEffect(() => {
        const { page } = meta
        setVehiclePage(page)
    }, [meta])

    return (
        <Main>
            <main className={`container ${styles['top-view-more']}`}>
                <input type={'text'} placeholder='Search vehicle (ex. type vehicle, vehicle name, location name)' className={styles['search-vehicle']} />
                <img src={searchIcon} alt='avatar' className={styles['search']} />

                <section className={`container-fluid ${styles['flex-search-filter']}`}>
                    <select className={styles['box-select']} defaultValue=''>
                        <option value={''} disabled>Choose Type Vehicle</option>
                        <option value={1}>Car</option>
                        <option value={2}>Motorbike</option>
                        <option value={3}>Bike</option>
                    </select>
                    <select className={styles['box-select']} defaultValue=''>
                        <option value={''} disabled>Choose Location</option>
                        {Array.isArray(locationArr) && locationArr.length > 0 &&
                            locationArr.map((data) => (
                                <React.Fragment key={data.id}>
                                    <option value={data.id}>{data.name}</option>
                                </React.Fragment>
                            ))
                        }
                    </select>
                    <select className={styles['box-select']} defaultValue=''>
                        <option value={''} disabled>Order</option>
                        <option value={'name'}>Vehicles</option>
                        <option value={'locations'}>locations</option>
                        <option value={'rating'}>Ratings</option>
                    </select>
                    <select className={styles['box-select']} defaultValue=''>
                        <option value={''} disabled>Sort</option>
                        <option value={'asc'}>Ascending</option>
                        <option value={'desc'}>Descending</option>
                    </select>
                </section>

                {vehicleArr.length !== 0 ? (
                    <React.Fragment>
                        <p className={styles['data-vehicle']}>{`Total vehicle ${meta.totalData} remaining ${meta.totalRemainingData === null ? 'empty' : meta.totalRemainingData}`}</p>
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
                        <button className={styles['btn-prev']}>Prev</button>
                        <h3 className={styles['page-text']}>{meta.page}</h3>
                        <button className={styles['btn-next']}>Next</button>
                    </div>
                </section>

            </main>
        </Main>
    )
}

export default ViewMore
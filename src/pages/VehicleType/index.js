import React, { useEffect } from 'react'
import styles from './index.module.scss'
import Main from '../../components/Main'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import searchIcon from '../../assets/svg/search.svg'
import CardVehicle from '../../components/CardVehicles'
import vehicleImgDefault from '../../assets/img/vehicle-default.png'

import { listVehicleCarAction } from '../../redux/actions/listVehicles'
import { listVehicleMotorbikeAction } from '../../redux/actions/listVehicles'
import { listVehicleBikeAction } from '../../redux/actions/listVehicles'

import { paramCarVehicle, paramMotorbikeVehicle, paramBikeVehicle } from '../../modules/helper/listVehicle'


const VehicleType = () => {
    const state = useSelector(state => state)

    const dispatch = useDispatch()

    const { listCarHome, listMotorbikeHome, listBikeHome, listPopularVehicle } = state.listVehicle

    useEffect(() => {
        dispatch(listVehicleCarAction(paramCarVehicle))
        dispatch(listVehicleMotorbikeAction(paramMotorbikeVehicle))
        dispatch(listVehicleBikeAction(paramBikeVehicle))
    }, [dispatch])

    return (
        <Main>
            <main className={`container ${styles['top-vehicle-type']}`}>
                <input type={'text'} placeholder='Search vehicle (ex. cars, cars, name)' className={styles['search-vehicle']} />
                <img src={searchIcon} alt='' className={styles['search']} />

                <section className='container'>
                    <div className='row justify-content-between'>
                        <div className='col-sm-1'>
                            <h2 className={styles['popular']}>Popular Town</h2>
                        </div>
                        <div className='col-sm-1'>
                            <p className={styles['view-all']}>View All {'>'}</p>
                        </div>
                    </div>

                    <div className={styles['popular-town-list']}>
                        {listPopularVehicle !== [] ? (
                            <React.Fragment>
                                {Array.isArray(listPopularVehicle) && listPopularVehicle.length > 0 &&
                                    listPopularVehicle.map((data) => (
                                        <React.Fragment key={data.id}>
                                            <CardVehicle
                                                id={data.id}
                                                image={data.image !== null ? data.image : vehicleImgDefault}
                                                name={data.name}
                                            />
                                        </React.Fragment>
                                    ))
                                }
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <h3 style={{
                                    position: 'relative',
                                    marginTop: 43
                                }}>Coming Soon</h3>
                            </React.Fragment>
                        )}
                    </div>
                </section>

                <section className='container'>
                    <div className='row justify-content-between'>
                        <div className='col-sm-1'>
                            <h2 className={styles['popular']}>Cars</h2>
                        </div>
                        <div className='col-sm-1'>
                            <p className={styles['view-all']}>View All {'>'}</p>
                        </div>
                    </div>

                    <div className={styles['popular-town-list']}>
                        {listCarHome !== [] ? (
                            <React.Fragment>
                                {Array.isArray(listCarHome) && listCarHome.length > 0 &&
                                    listCarHome.map((data) => (
                                        <React.Fragment key={data.id}>
                                            <CardVehicle
                                                id={data.id}
                                                image={data.image !== null ? data.image : vehicleImgDefault}
                                                name={data.name}
                                            />
                                        </React.Fragment>
                                    ))
                                }
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <h3 style={{
                                    position: 'relative',
                                    marginTop: 43
                                }}>Coming Soon</h3>
                            </React.Fragment>
                        )}
                    </div>
                </section>

                <section className='container'>
                    <div className='row justify-content-between'>
                        <div className='col-sm-1'>
                            <h2 className={styles['popular']}>Motorbike</h2>
                        </div>
                        <div className='col-sm-1'>
                            <p className={styles['view-all']}>View All {'>'}</p>
                        </div>
                    </div>

                    <div className={styles['popular-town-list']}>
                        {listMotorbikeHome !== [] ? (
                            <React.Fragment>
                                {Array.isArray(listMotorbikeHome) && listMotorbikeHome.length > 0 &&
                                    listMotorbikeHome.map((data) => (
                                        <React.Fragment key={data.id}>
                                            <CardVehicle
                                                id={data.id}
                                                image={data.image !== null ? data.image : vehicleImgDefault}
                                                name={data.name}
                                            />
                                        </React.Fragment>
                                    ))
                                }
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <h3 style={{
                                    position: 'relative',
                                    marginTop: 43
                                }}>Coming Soon</h3>
                            </React.Fragment>
                        )}
                    </div>
                </section>

                <section className='container' style={{ marginBottom: 17 }}>
                    <div className='row justify-content-between'>
                        <div className='col-sm-1'>
                            <h2 className={styles['popular']}>Bike</h2>
                        </div>
                        <div className='col-sm-1'>
                            <p className={styles['view-all']}>View All {'>'}</p>
                        </div>
                    </div>

                    <div className={styles['popular-town-list']}>
                        {listBikeHome !== [] ? (
                            <React.Fragment>
                                {Array.isArray(listBikeHome) && listBikeHome.length > 0 &&
                                    listBikeHome.map((data) => (
                                        <React.Fragment key={data.id}>
                                            <CardVehicle
                                                id={data.id}
                                                image={data.image !== null ? data.image : vehicleImgDefault}
                                                name={data.name}
                                            />
                                        </React.Fragment>
                                    ))
                                }
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <h3 style={{
                                    position: 'relative',
                                    marginTop: 43
                                }}>Coming Soon</h3>
                            </React.Fragment>
                        )}
                    </div>
                </section>

            </main>
        </Main>
    )
}

export default VehicleType
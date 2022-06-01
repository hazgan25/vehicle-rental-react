import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import Main from '../../components/Main'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import searchIcon from '../../assets/svg/search.svg'
import CardVehicle from '../../components/CardVehicles'
import vehicleImgDefault from '../../assets/img/vehicle-default.png'

import { listVehicleCarAction, listVehicleMotorbikeAction, listVehicleBikeAction, listVehiclePopularAction } from '../../redux/actions/listVehicles'

import { paramCarVehicle, paramMotorbikeVehicle, paramBikeVehicle, paramsPopulerVehicle } from '../../modules/helper/listVehicle'


const VehicleType = () => {
    const state = useSelector(state => state)

    const [search, setSearch] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { listCarHome, listMotorbikeHome, listBikeHome, listPopularVehicle } = state.listVehicle

    useEffect(() => {
        dispatch(listVehiclePopularAction(paramsPopulerVehicle))
            .catch((err) => {
                if (err) {
                    navigate('/error%20server')
                }
            })
        dispatch(listVehicleCarAction(paramCarVehicle))
            .catch((err) => {
                if (err) {
                    navigate('/error%20server')
                }
            })
        dispatch(listVehicleMotorbikeAction(paramMotorbikeVehicle))
            .catch((err) => {
                if (err) {
                    navigate('/error%20server')
                }
            })
        dispatch(listVehicleBikeAction(paramBikeVehicle))
            .catch((err) => {
                if (err) {
                    navigate('/error%20server')
                }
            })
    }, [dispatch, navigate])

    const searchHandler = () => {
        navigate(`/view-more?search=${search}&type=&location=`)
    }
    const viewAllPopularHandler = () => {
        navigate(`/view-more?search=&type=&location=&by=rating&order=desc`)
    }
    const viewAllCarHandler = () => {
        navigate('/view-more?search=&type=1&location=&by=id&order=desc')
    }
    const viewAllMotorbikeHandler = () => {
        navigate('/view-more?search=&type=2&location=&by=id&order=desc')
    }
    const ViewAllBikeHandler = () => {
        navigate('/view-more?search=&type=3&location=&by=id&order=desc')
    }

    return (
        <Main>
            <main className={`container ${styles['top-vehicle-type']}`}>
                <form onSubmit={searchHandler}>
                    <input type={'text'} placeholder='Search vehicle (ex. type vehicle, vehicle name, location name)' className={styles['search-vehicle']} onChange={e => setSearch(e.target.value)} />
                    <img src={searchIcon} alt='avatar' className={styles['search']} onClick={searchHandler} />
                </form>

                <section className='container'>
                    <div className='row justify-content-between'>
                        <div className='col-sm-1'>
                            <h2 className={styles['popular']}>Popular Town</h2>
                        </div>
                        <div className='col-sm-1'>
                            <p className={styles['view-all']} onClick={viewAllPopularHandler}>View All {'>'}</p>
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
                            <p className={styles['view-all']} onClick={viewAllCarHandler}>View All {'>'}</p>
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
                            <p className={styles['view-all']} onClick={viewAllMotorbikeHandler}>View All {'>'}</p>
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
                            <p className={styles['view-all']} onClick={ViewAllBikeHandler}>View All {'>'}</p>
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
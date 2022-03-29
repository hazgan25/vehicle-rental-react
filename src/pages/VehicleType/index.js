import React, { useEffect } from 'react'
import './vehicleType.scoped.css'
import { useSelector, useDispatch } from 'react-redux'

import Main from '../../components/Main'

import search from '../../assets/svg/search.svg'
import CardPopularVehicle from '../../components/CardPopularVehicle'

import { listVehicleCarAction } from '../../redux/actions/listVehicles'
import { listVehicleMotorbikeAction } from '../../redux/actions/listVehicles'
import { listVehicleBikeAction } from '../../redux/actions/listVehicles'

import { paramCarVehicle, paramMotorbikeVehicle, paramBikeVehicle } from '../../modules/helper/listVehicle'

import vehicleImgDefault from '../../assets/img/vehicle-default.png'

const VehicleType = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const { listCarHome, listMotorbikeHome, listBikeHome } = state.listVehicle

    useEffect(() => {
        dispatch(listVehicleCarAction(paramCarVehicle))
        dispatch(listVehicleMotorbikeAction(paramMotorbikeVehicle))
        dispatch(listVehicleBikeAction(paramBikeVehicle))
    }, [dispatch])

    return (
        <Main>
            <main className='container top-vehicle-type'>
                <input type='text' placeholder='Search vehicle (ex. cars, cars name)' className='search-vehicle' />
                <img src={search} alt='' className='search' />
                <section>
                    <CardPopularVehicle />
                </section>

                <section className='space-top-vehicle'>
                    <div className='row justify-content-between'>
                        <div className='col-sm-1'>
                            <h2 className='popular'>Cars</h2>
                        </div>
                        <div className='col-sm-1'>
                            <p className='view-all'>View All {'>'}</p>
                        </div>
                    </div>
                    <div className='popular-town-list'>
                        {listCarHome !== [] ? (
                            <React.Fragment>
                                {listCarHome.length > 0 &&
                                    listCarHome.map((data) => (
                                        <React.Fragment key={data.id}>
                                            <main>
                                                <div style={{
                                                    backgroundImage: `url(${vehicleImgDefault})`,
                                                    position: 'absolute'
                                                }} className='img-vehicle'>
                                                    <div className='text-block'>
                                                        <p className='location-name opacity'>
                                                            {data.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    backgroundImage: data.image ?
                                                        `url(${process.env.REACT_APP_HOST})` :
                                                        `url(${vehicleImgDefault})`
                                                }} className='img-vehicle'>
                                                    <div className='text-block'>
                                                        <p className='location-name opacity'>
                                                            {data.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </main>
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

                <section className='space-top-vehicle'>
                    <div className='row justify-content-between'>
                        <div className='col-sm-1'>
                            <h2 className='popular'>Motorbike</h2>
                        </div>
                        <div className='col-sm-1'>
                            <p className='view-all'>View All {'>'}</p>
                        </div>
                    </div>
                    <div className='popular-town-list'>
                        {listMotorbikeHome !== [] ? (
                            <React.Fragment>
                                {listMotorbikeHome.length > 0 &&
                                    listMotorbikeHome.map((data) => (
                                        <React.Fragment key={data.id}>
                                            <main>
                                                <div style={{
                                                    backgroundImage: `url(${vehicleImgDefault})`,
                                                    position: 'absolute'
                                                }} className='img-vehicle'>
                                                    <div className='text-block'>
                                                        <p className='location-name opacity'>
                                                            {data.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    backgroundImage: data.image ?
                                                        `url(${process.env.REACT_APP_HOST})` :
                                                        `url(${vehicleImgDefault})`
                                                }} className='img-vehicle'>
                                                    <div className='text-block'>
                                                        <p className='location-name opacity'>
                                                            {data.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </main>
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

                <section className='space-top-vehicle'>
                    <div className='row justify-content-between'>
                        <div className='col-sm-1'>
                            <h2 className='popular'>Bike</h2>
                        </div>
                        <div className='col-sm-1'>
                            <p className='view-all'>View All {'>'}</p>
                        </div>
                    </div>
                    <div className='popular-town-list'>
                        {listBikeHome !== [] ? (
                            <React.Fragment>
                                {listBikeHome.length > 0 &&
                                    listBikeHome.map((data) => (
                                        <React.Fragment key={data.id}>
                                            <main>
                                                <div style={{
                                                    backgroundImage: `url(${vehicleImgDefault})`,
                                                    position: 'absolute'
                                                }} className='img-vehicle'>
                                                    <div className='text-block'>
                                                        <p className='location-name opacity'>
                                                            {data.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    backgroundImage: data.image ?
                                                        `url(${process.env.REACT_APP_HOST})` :
                                                        `url(${vehicleImgDefault})`
                                                }} className='img-vehicle'>
                                                    <div className='text-block'>
                                                        <p className='location-name opacity'>
                                                            {data.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </main>
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
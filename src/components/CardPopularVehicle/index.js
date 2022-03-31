import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './cardPopular.scoped.css'

import { useNavigate } from 'react-router-dom'

import { listVehiclePopularAction } from '../../redux/actions/listVehicles'
import { paramsPopulerVehicle } from '../../modules/helper/listVehicle'

import vehicleImgDefault from '../../assets/img/vehicle-default.png'

const CardPopularVehicle = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { listPopularVehicle } = state.listVehicle

    useEffect(() => {
        dispatch(listVehiclePopularAction(paramsPopulerVehicle))
    }, [dispatch])

    return (
        <main>
            <section className='row justify-content-between'>
                <div className='col-sm-1'>
                    <h2 className='popular'>Popular Town</h2>
                </div>
                <div className='col-sm-1'>
                    <p className='view-all'>View All {'>'}</p>
                </div>
            </section>
            <section className='popular-town-list' style={{ justifyContent: listPopularVehicle !== [] ? 'space-between' : 'center' }}>
                {listPopularVehicle !== [] ? (
                    <React.Fragment>
                        {listPopularVehicle.length > 0 &&
                            listPopularVehicle.map((data) => (
                                <React.Fragment key={data.id}>
                                    <div>
                                        <div style={{ backgroundImage: `url(${vehicleImgDefault})` }} className='img-vehicle-default'
                                            onClick={() => { navigate(`/vehicle/detail/${data.id}`) }}>
                                            <div className='text-block'>
                                                <p className='location-name opacity'>
                                                    {data.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{
                                            backgroundImage: data.image ?
                                                `url(${process.env.REACT_APP_HOST}/${data.image})` :
                                                `url(${vehicleImgDefault})`
                                        }} className='img-vehicle'
                                            onClick={() => { navigate(`/vehicle/detail/${data.id}`) }}>
                                            <div className='text-block'>
                                                <p className='location-name opacity'>
                                                    {data.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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
            </section>
        </main>
    )
}

export default CardPopularVehicle
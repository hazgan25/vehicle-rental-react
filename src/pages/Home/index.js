import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Main from '../../components/Main'

import { useSelector, useDispatch } from 'react-redux'
import { getAllLocation } from '../../modules/utils/location'
import { Link } from 'react-router-dom'

import backgrounBefore from '../../assets/img/Home-bg-before.webp'
import backgroundAfter from '../../assets/img/Home-bg-after.webp'

import CardVehicle from '../../components/CardVehicles'
import Testimonial from '../../components/Testimonial'

import vehicleImgDefault from '../../assets/img/vehicle-default.png'

import { listVehiclePopularAction } from '../../redux/actions/listVehicles'
import { paramsPopulerVehicle } from '../../modules/helper/listVehicle'

const Home = () => {
    const state = useSelector(state => state)

    const [locationArr, setLocationArr] = useState([])
    const [selectLocation, setSelectLocation] = useState('')
    const [selectType, setSelectType] = useState('')
    const [selectPayment, setSelectPayment] = useState('')

    const { auth, listVehicle } = state
    const { token, userData } = auth
    const { role } = userData
    const { listPopularVehicle } = listVehicle

    const dispatch = useDispatch()

    useEffect(() => {
        getAllLocation()
            .then((res) => {
                setLocationArr(res.data.result)
                console.log(res)
            })
            .catch((...err) => console.log(err))

        dispatch(listVehiclePopularAction(paramsPopulerVehicle))
    }, [dispatch])

    return (
        <Main>
            <section className={styles['menu-bg']} style={{ backgroundImage: !token ? `url('${backgrounBefore}')` : `url(${backgroundAfter})` }}>
                <div className={styles['transparan-home']}>

                    <article className={`container ${styles['select-order']}`}>
                        <h1 className={styles['explore-travel']}>Explore and Travel</h1>
                        <p className={styles['finder']}>Vehicle Finder</p>
                        <div className={styles['line-wrapper']}>
                            <span className={styles['line']}></span>
                        </div>
                        {!token ? (
                            <React.Fragment>
                                <form>
                                    <div className='row'>
                                        <div className='col-sm'>
                                            <select className={styles['forms-select']} onChange={e => setSelectLocation(e.target.value)}>
                                                <option value='' disabled={true}>Location</option>
                                                {locationArr !== [] ? (
                                                    <React.Fragment>
                                                        {Array.isArray(locationArr) && locationArr.length > 0 &&
                                                            locationArr.map((data) => (
                                                                <React.Fragment key={data.id}>
                                                                    <option value={data.id}>{data.name}</option>
                                                                </React.Fragment>
                                                            ))
                                                        }
                                                    </React.Fragment>
                                                ) : (
                                                    <></>
                                                )}
                                            </select>
                                            <select className={styles['forms-select']} defaultValue='' onChange={e => setSelectType(e.target.value)}>
                                                <option selected value='' disabled>Type</option>
                                                <option value={1}>car</option>
                                                <option value={2}>motorbike</option>
                                                <option value={3}>bike</option>
                                            </select>
                                            <div className="col-sm" >
                                                <select className={styles['forms-select']} defaultValue='' onChange={e => setSelectPayment(e.target.value)}>
                                                    <option selected value='' disabled>Payment</option>
                                                    <option value='expensive'>expensive</option>
                                                    <option value='inexpensive'>inexpensive</option>
                                                </select>
                                                <input type="date" className={styles['form-dates']} />
                                            </div>
                                            <button className={styles['btn-explore']}>Explore</button>
                                        </div>
                                    </div>
                                </form>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <form>
                                    <div className='row'>
                                        <div className='col-sm'>
                                            <input type='text' placeholder="Type the vehicle (ex. motorbike" className={`${styles['forms-select']} ${styles['input-vehicle']}`} />
                                            <div className='col-sm'>
                                                <select className={styles['forms-select']} defaultValue=''>
                                                    <option selected value='' disabled>Location</option>
                                                    {Array.isArray(locationArr) && locationArr.length > 0 &&
                                                        locationArr.map((data) => (
                                                            <React.Fragment key={data.id}>
                                                                {console.log(data)}
                                                                <option value={data.id}>{data.name}</option>
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </select>
                                                <input type="date" className={styles['form-dates']} />
                                            </div>
                                            <button className={styles['btn-explore']}>Search</button>
                                        </div>
                                    </div>
                                </form>
                            </React.Fragment>
                        )}
                    </article>
                </div>
            </section>

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

            {role !== 'owner' ? (
                <React.Fragment></React.Fragment>
            ) : (
                <React.Fragment>
                    <section style={{ display: "flex", justifyContent: 'center', marginTop: 93, marginBottom: 15 }}>
                        <Link to='/vehicle/add'>
                            <button className={`w-5 ${styles['btn-add-new-item']}`}>Add new item </button>
                        </Link>
                    </section>
                </React.Fragment>
            )}

            <section style={{ marginBottom: 104 }}>
                <Testimonial />
            </section>
        </Main>
    )
}

export default Home
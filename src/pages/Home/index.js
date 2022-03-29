import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


import './home.scoped.css'
import Main from '../../components/Main'
import { getAllLocation } from '../../modules/utils/location'

import CardPopularVehicle from '../../components/CardPopularVehicle'
import Testimonial from '../../components/Testimonial'

import backgrounBefore from '../../assets/img/Home-bg-before.webp'
import backgroundAfter from '../../assets/img/Home-bg-after.webp'
import { Link } from 'react-router-dom'


const Home = () => {
    const state = useSelector(state => state)
    const [locationArr, setLocationArr] = useState([])

    const { token, userData } = state.auth
    const { role } = userData

    useEffect(() => {
        getAllLocation()
            .then((res) => {
                setLocationArr(res.data.result)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <Main>
            <section className='contailer-fluid menu-bg home'
                style={{ backgroundImage: !token ? `url('${backgrounBefore}')` : `url(${backgroundAfter})` }}>
                <div className='transparan-home'>

                    <section className='container select-order'>
                        <h1 className='explore-travel'>Explore and Travel</h1>
                        <p className='finder'>Vehicle Finder</p>
                        <div className="line-wrapper">
                            <span className="line"></span>
                        </div>
                        {
                            !token ? (
                                <React.Fragment>
                                    <form>
                                        <div className='row'>
                                            <div className='col-sm'>
                                                <select className='forms-select' defaultValue={''}>
                                                    <option value='' disabled>Location</option>
                                                    {Array.isArray(locationArr) && locationArr.length > 0 &&
                                                        locationArr.map((data) => (
                                                            <React.Fragment key={data.id}>
                                                                <option value={data.id}>{data.name}</option>
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </select>
                                                <select className="forms-select" defaultValue="">
                                                    <option selected value='' disabled>Type</option>
                                                    <option value={1}>car</option>
                                                    <option value={2}>motorbike</option>
                                                    <option value={3}>bike</option>
                                                </select>
                                                <div className="col-sm">
                                                    <select className="forms-select" defaultValue="">
                                                        <option value='' disabled>Payment</option>
                                                        <option value='1'>One</option>
                                                        <option value='1'>Two</option>
                                                        <option value='1'>Three</option>
                                                    </select>
                                                    <input type="date" className="form-dates" />
                                                </div>
                                                <button className="btn-explore">Explore</button>
                                            </div>
                                        </div>
                                    </form>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <form>
                                        <div className='row'>
                                            <div className='col-sm'>
                                                <input type='text' placeholder="Type the vehicle (ex. motorbike" className='forms-select input-vehicle' />
                                                <div className='col-sm'>
                                                    <select className="forms-select">
                                                        <option value='' disabled>Location</option>
                                                        {Array.isArray(locationArr) && locationArr.length > 0 &&
                                                            locationArr.map((data) => (
                                                                <React.Fragment key={data.id}>
                                                                    <option value={data.id}>{data.name}</option>
                                                                </React.Fragment>
                                                            ))
                                                        }
                                                    </select>
                                                    <input type="date" className="form-dates" />
                                                </div>
                                                <button className="btn-explore">Search</button>
                                            </div>
                                        </div>
                                    </form>
                                </React.Fragment>
                            )
                        }
                    </section>
                </div>
            </section>

            <section className='container'>
                <CardPopularVehicle />
            </section>

            {role === 'owner' ? (
                <React.Fragment>
                    <div style={{ display: "flex", justifyContent: 'center', marginTop: 93, marginBottom: 15 }}>
                        <Link to='/vehicle/add'>
                            <button style={{
                                background: '#393939',
                                width: '80%',
                                height: 89,
                                borderRadius: 10,
                                color: '#FFCD61',
                                fontSize: 24,
                                fontWeight: 'bold'
                            }}>Add new item </button>
                        </Link>
                    </div>
                </React.Fragment>
            ) : (
                <>
                </>
            )}

            <Testimonial />

        </Main>
    )
}

export default Home
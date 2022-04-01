import React, { useEffect, useState } from 'react'
import './Payment.scoped.scss'

import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { locationByName } from '../../modules/utils/location'
import { vehicleDetail } from '../../modules/utils/vehicle'
import { reservationPayment } from '../../modules/utils/history'

import Main from '../../components/Main'
import vehicleImgDefault from '../../assets/img/vehicle-default.png'
import arrowBack from '../../assets/svg/arrowBack.svg'

import formatRupiah from '../../modules/helper/formatRupiah'
import Swal from 'sweetalert2'

const Payment = () => {
    const state = useSelector(state => state)
    const params = useParams()
    const navigate = useNavigate()

    const [vehicleData, setVehicleData] = useState([])
    const [vehiclePrice, setVehiclePrice] = useState(0)

    const { auth } = state
    const { token, userData } = auth
    const { name, phone, email } = userData

    const { id, day, location, quantity, totalPrice } = params
    const { vehicle, price, types, owner_id } = vehicleData

    let quantityArr = []
    for (let i = 0; i < quantity; i++) {
        quantityArr.push(i)
    }

    const optionsDate = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }
    const date = new Date()
    const dateNow = date.toLocaleDateString('en-US', optionsDate)

    useEffect(() => {
        locationByName(location, token)
            .then((res) => {
                if (location !== res.data.result[0].name) {
                    navigate(-1)
                }
            })
            .catch(({ ...err }) => {
                if (err) {
                    navigate(-1)
                }
            })

        vehicleDetail(id)
            .then((res) => {
                setVehicleData(res.data.result)
            })
            .catch(({ ...err }) => {
                if (err) {
                    navigate(-1)
                }
            })

        if (isNaN(totalPrice) === true || isNaN(quantity) === true || isNaN(day) === true) navigate(-1)
        if (price !== undefined) setVehiclePrice(price)
    }, [location, navigate, token, id, totalPrice, price, day, quantity])

    const handlePayment = () => {
        const body = {
            date: day,
            quantity: quantity
        }
        reservationPayment(id, token, body)
            .then((res) => {
                // console.log(res)
                if (res) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success Payment',
                        text: `success payment rental ${vehicle}`
                    })
                    setTimeout(() => {
                        navigate('/')
                    }, 2500)
                }
            })
            .catch(({ ...err }) => {
                console.log(err)
            })
    }

    return (
        <Main>
            {userData && userData.id !== owner_id ? (
                <React.Fragment>
                    <main className='container mt-3'>
                        <section className='backHome justify-content-between'>
                            <img src={arrowBack} alt='avatar' className='backArrow' style={{ cursor: 'pointer' }} onClick={() => { navigate(-1) }} />
                            <h3 className='addNewItem' style={{ left: 23 }}>Payment</h3>
                        </section>

                        <section className='container flex-reservation mt-5'>
                            <img src={vehicleImgDefault} alt='avater' className='img-payment' style={{ position: 'absolute' }} />
                            <img src={vehicleImgDefault} alt='avater' className='img-payment' />
                            <div className='dekstop-mode-reservation-pos-rel'>
                                <h3 className='vehicle-text-reservation'>{vehicle}</h3>
                                <h4 className='location-text-reservation mt-5'>{location}</h4>
                                <h5 className='no-prepayment-reservation mt-4' style={{ color: 'gray' }}>No Prepayment</h5>
                                <h5 className='code-text mt-5'>#FG1209878YZS</h5>
                                <button className='btn-copy'>Copy booking code</button>
                            </div>
                        </section>

                        <section className='container flex-reservation mt-5'>
                            <div>
                                <div className='box-payment-left'>
                                    <p className='payment-bold'>{`Quantity : ${quantity} ${types}`}</p>
                                </div>

                                <div className='box-noflex-left mt-4'>
                                    <p className='payment-bold'>Order Detail :</p>
                                    {quantityArr.map((data) => (
                                        <React.Fragment key={data}>
                                            <p>{`1 ${types} : Rp. ${formatRupiah(vehiclePrice)}`}</p>
                                        </React.Fragment>
                                    ))}
                                    <p className='payment-bold'>{`total : Rp. ${formatRupiah(totalPrice)}`}</p>
                                </div>
                            </div>

                            <div className='dekstop-mode-reservation-pos-rel'>
                                <div className='box-payment-flex'>
                                    <p className='payment-bold'>Reservation Date :</p>
                                    <p>{`${dateNow} for ${day} day`}</p>
                                </div>
                                <div className='box-payment-noFlex mt-4'>
                                    <p className='payment-bold'>Identity :</p>
                                    <p>{`${name === null || name === '' ? 'no name' : name} (${phone === null || phone === '' ? 'no number phone' : phone})`}</p>
                                    <p>{email}</p>
                                </div>
                            </div>
                        </section>

                        <section className='container flex-reservation mt-3 code-flex'>
                            <p className='payment-bold'>{`Payment Code : `}</p>
                            <div className='box-code'>
                                #FG1209878YZS
                            </div>
                        </section>

                        <button className='btn-payment m-5' onClick={handlePayment}>
                            Finish Payment
                        </button>

                    </main>
                </React.Fragment>
            ) : (
                <>
                    <p>ini owner</p>
                </>
            )}
        </Main>
    )
}

export default Payment
import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import stylesReservation from '../VehicleDetail/index.module.scss'

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
                    <main className='container mt-3' style={{ marginBottom: 180 }}>
                        <section className={styles['back-home']}>
                            <img src={arrowBack} alt='avatar' className={styles['backArrow']} style={{ cursor: 'pointer' }} onClick={() => { navigate(-1) }} />
                            <h3 className={styles['payment-text']} style={{ left: 23 }}>Payment</h3>
                        </section>

                        <section className={`container mt-5 ${styles['flex-payment']}`}>
                            <img src={vehicleImgDefault} alt='avater' className={styles['img-payment']} style={{ position: 'absolute' }} />
                            <img src={vehicleImgDefault} alt='avater' className={styles['img-payment']} />
                            <div className={styles['dekstop-mode-payment-pos-rel']}>
                                <h3 className={stylesReservation['vehicle-text-reservation']}>{vehicle}</h3>
                                <h4 className={`mt-5 ${stylesReservation['location-text-reservation']}`}>{location}</h4>
                                <h5 className={`mt-4 ${stylesReservation['no-prepayment-reservation']}`}>No Prepayment</h5>
                                <h5 className={`mt-5 ${styles['code-text']}`}>#FG1209878YZS</h5>
                                <button className={styles['btn-copy']}>Copy booking code</button>
                            </div>
                        </section>

                        <section className={`container mt-5 ${stylesReservation['flex-reservation']}`}>
                            <div>
                                <div className='box-payment-left'>
                                    <p className={styles['payment-bold']}>{`Quantity : ${quantity} ${types}`}</p>
                                </div>

                                <div className={`mt-4 ${styles['box-noflex-left']}`}>
                                    <p className={styles['payment-bold']}>Order Detail :</p>
                                    {quantityArr.map((data) => (
                                        <React.Fragment key={data}>
                                            <p>{`1 ${types} : Rp. ${formatRupiah(vehiclePrice)}`}</p>
                                        </React.Fragment>
                                    ))}
                                    <p className={styles['payment-bold']}>{`total : Rp. ${formatRupiah(totalPrice)}`}</p>
                                </div>
                            </div>

                            <div className={stylesReservation['dekstop-mode-reservation-pos-rel']}>
                                <div className={styles['box-payment-flex']}>
                                    <p className={styles['payment-bold']}>Reservation Date :</p>
                                    <p>{`${dateNow} for ${day} day`}</p>
                                </div>
                                <div className={`mt-4 ${styles['box-payment-noFlex']}`}>
                                    <p className={styles['payment-bold']}>Identity :</p>
                                    <p>{`${name === null || name === '' ? 'no name' : name} (${phone === null || phone === '' ? 'no number phone' : phone})`}</p>
                                    <p>{email}</p>
                                </div>
                            </div>
                        </section>

                        <section className={`container ${stylesReservation['flex-reservation']} ${styles['code-flex']}`}>
                            <p>{``}</p>
                            <p className={styles['payment-bold']}>{`Payment Code : `}</p>
                            <div className={styles['box-code']}>
                                #FG1209878YZS
                            </div>
                        </section>

                        <button className={`mt-5 ${styles['btn-payment']}`} onClick={handlePayment}>
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
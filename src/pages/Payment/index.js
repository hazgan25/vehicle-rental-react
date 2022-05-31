import React, { useEffect, useState } from 'react'
import Main from '../../components/Main'
import styles from './index.module.scss'

import vehicleImgDefault from '../../assets/img/vehicle-default.png'
import arrowBack from '../../assets/svg/arrowBack.svg'

import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { vehicleDetail } from '../../modules/utils/vehicle'
import { reservationPayment } from '../../modules/utils/history'

import formatRupiah from '../../modules/helper/formatRupiah'
import Swal from 'sweetalert2'

const Payment = () => {
    const state = useSelector(state => state)
    const params = useParams()
    const navigate = useNavigate()

    const { token, userData } = state.auth

    const [vehicleData, setVehicleData] = useState({})
    const [showImg, setShowImg] = useState('')

    const { id, day, priceDay, quantity, total } = params

    useEffect(() => {
        vehicleDetail(id)
            .then((res) => {
                setVehicleData(res.data.result)
                setShowImg(res.data.result.images[0].images)
                if (res.data.result.price !== parseInt(priceDay)) navigate(-1)
                if (parseInt(total) !== res.data.result.price * parseInt(day) * parseInt(quantity)) navigate(-1)
            }).catch((...err) => {
                if (err) {
                    navigate(-1)
                }
            })
    }, [id, day, priceDay, quantity, total, navigate])

    useEffect(() => {
        if (userData === vehicleData.owner_id) navigate(-1)
    }, [userData, vehicleData.owner_id, navigate])

    const bookingCode = (length) => {
        let result = '';
        let randomCode = `${token}${vehicleData.vehicle}${quantity}${day}`
        let randomCodeLength = randomCode.length
        for (let i = 0; i < length; i++) {
            result += randomCode.charAt(Math.floor(Math.random() *
                randomCodeLength))
        }
        return result
    }

    const bookingCodeText = bookingCode(8)

    const quantityArr = []
    for (let i = 0; i < parseInt(quantity); i++) {
        quantityArr.push(i)
    }

    const paymentHandler = () => {
        const body = {
            date: day,
            quantity: quantity,
        }
        reservationPayment(id, token, body)
            .then((res) => {
                if (res) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success Payment',
                        text: `success payment rental ${vehicleData.vehicle}`
                    })
                    navigate('/')
                }
            })
            .catch(({ ...err }) => {
                console.log(err)
            })
    }

    return (
        <Main>
            <main className='container mt-3 mb-3'>
                <section className={styles['back-home']}>
                    <img src={arrowBack} alt='avatar' className={styles['backArrow']} style={{ cursor: 'pointer' }} onClick={() => { navigate(-1) }} />
                    <h3 className={styles['payment-text']} style={{ left: 23 }}>Payment</h3>
                </section>

                <section className={`mt-4 ${styles['flex-one']}`}>
                    <div className={styles['left']}>
                        <img src={`${process.env.REACT_APP_HOST}/${showImg}`} className={styles['img']}
                            onError={(e) => {
                                e.currentTarget.onerror = null
                                e.currentTarget.src = `${vehicleImgDefault}`
                            }} alt='avatar' />
                    </div>
                    <div className={styles['right']}>
                        <h3 className={styles['vehicle-text']}>{vehicleData.vehicle}</h3>
                        <h4 className={styles['location-text']}>{vehicleData.location}</h4>
                        <h5 className={`mt-4 ${styles['prepayment-text']}`}>No Prepayment</h5>
                        <h5 className={`mt-4 ${styles['code-text']}`}>{bookingCodeText}</h5>
                        <button className={`mt-4 ${styles['btn-booking']}`}>Copy booking code</button>
                    </div>
                </section>

                <section className={`mt-4 ${styles['flex-one']}`}>
                    <div className={`${styles['left']} ${styles['box-text']}`}>
                        <p style={{ textAlign: 'center' }} className={styles['box-text-bold']}>{`Quantity : ${quantity} ${vehicleData.types}`}</p>
                    </div>
                    <div className={`${styles['right']} ${styles['box-text']}`} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <p className={styles['box-text-bold']}>{`Reservation Date : `}</p>
                        <p className={styles['box-normal-text']}>{`${day} day`}</p>
                    </div>
                </section>

                <section className={`mt-4 ${styles['flex-one']}`}>
                    <div className={`${styles['left']} ${styles['box-text']}`}>
                        <p className={styles['box-text-bold']}>Order Detail :</p>
                        <p className={styles['box-normal-text']}>{`${quantity} ${vehicleData.types} : Rp.${formatRupiah(vehicleData.price * parseInt(quantity))}`}</p>
                        <p className={styles['box-normal-text']}>{`during ${day} day : Rp.${formatRupiah(vehicleData.price * parseInt(day))}`}</p>
                        <p className={styles['box-text-bold']}>
                            Total :
                            <span className={styles['box-normal-text']}>{` Rp.${formatRupiah(total)}`}</span>
                        </p>
                    </div>
                    <div className={`${styles['right']} ${styles['box-text']}`}>
                        <p className={styles['box-text-bold']}>Identity :</p>
                        <p className={styles['box-normal-text']}>{userData.name === '' ? 'User' : userData.name}
                            <span className={styles['box-normal-text']}>{` ( ${userData.phone === '' ? 'No number Phone' : userData.phone} )`}</span>
                        </p>
                        <p className={styles['box-normal-text']}>{userData.email}</p>
                    </div>
                </section>

                <section className={`mt-4 ${styles['flex-two']}`}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h5 className={`${styles['code-text']}`}>Payment Code : </h5>
                    </div>
                    <div className={`${styles['box-text-two']}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p className={styles['box-text-bold']}>{bookingCodeText}</p>
                        <button className={styles['btn-copy']}>Copy</button>
                    </div>
                    <select className={`${styles['box-text-two']} ${styles['prepayment-text']} ${styles['temp-select']}`}
                        defaultValue=''>
                        <option value={''} disabled>Select Payment Method</option>
                        <option value={'cash'}>Cash</option>
                        <option value={'transfer'}>Transfer</option>
                    </select>
                </section>

                <button className={`mt-4 ${styles['btn-finish']}`} onClick={paymentHandler}>
                    Finish Payment
                </button>
            </main>
        </Main>
    )
}

export default Payment
import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { vehicleDetail } from '../../modules/utils/vehicle'

import Main from '../../components/Main'
import vehicleImgDefault from '../../assets/img/vehicle-default.png'
import arrowBack from '../../assets/svg/arrowBack.svg'

import formatRupiah from '../../modules/helper/formatRupiah'
import Swal from 'sweetalert2'

const Reservation = () => {

    const state = useSelector(state => state)
    const params = useParams()
    const navigate = useNavigate()

    const { id } = params
    const { userData, token } = state.auth

    const [dataVehicle, setDataVehicle] = useState({})
    const [vehicleImgArr, setVehicleImgArr] = useState([])
    const [img1, setImg1] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [selectDate, setSelectDate] = useState(1)

    let dateArr = []
    for (let i = 1; i <= 7; i++) {
        dateArr.push(i)
    }

    const { vehicle, location, price, stock, owner_id } = dataVehicle
    const totalPrice = price * selectDate * quantity

    useEffect(() => {
        vehicleDetail(id)
            .then((res) => {
                setDataVehicle(res.data.result)
                setVehicleImgArr(res.data.result.images)
            }).catch((err) => {
                if (err) {
                    navigate(-1)
                }
            })
    }, [id, navigate])

    const btnPlusQuantity = () => {
        setQuantity(quantity + 1)
    }

    const btnMinQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    useEffect(() => {
        if (dataVehicle !== {} && vehicleImgArr[0] && vehicleImgArr[0] !== {}) {
            const image1 = vehicleImgArr[0].images
            setImg1(image1)
        }
    }, [dataVehicle, vehicleImgArr])

    const reservationHandler = () => {
        if (quantity > stock) {
            Swal.fire({
                icon: 'error',
                title: 'There is an error ?',
                text: 'out of stock'
            })
        }
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'There is an error ?',
                text: 'You need to login first'
            })
        }
        if (token !== null) {
            navigate(`/payment/vehicle=${id}&location=${location}&quantity=${quantity}&day=${selectDate}&total=${totalPrice}`)
        }
    }

    return (
        <Main>
            {userData && userData.id !== owner_id ? (
                <React.Fragment>
                    <main className='container mt-3'>
                        <section className={`${styles['back-home']}`}>
                            <img src={arrowBack} alt='avatar' className={styles['backArrow']} style={{ cursor: 'pointer' }} onClick={() => { navigate(-1) }} />
                            <h3 className={styles['reservation-text']}>Reservation</h3>
                        </section>

                        <section className={`${styles['flex-reservation']} mt-5`}>
                            {/* <img src={`${process.env.REACT_APP_HOST}/${img1}`} alt='avater' className={styles['img-reservation']} style={{ position: 'absolute' }} /> */}
                            <img src={img1 ? `${process.env.REACT_APP_HOST}/${img1}` : vehicleImgDefault} alt='avater' className={styles['img-reservation']} />
                            <div className={styles['dekstop-mode-reservation-pos-rel']}>
                                <h3 className={styles['vehicle-text-reservation']}>{vehicle}</h3>
                                <h4 className={`mt-5 ${styles['location-text-reservation']}`}>{location}</h4>
                                <h5 className={`mt-4 ${styles['no-prepayment-reservation']}`}>No Prepayment</h5>
                                <div className={`mt-5 ${styles['flex-quantity']}`}>
                                    <div className={`${styles['box-color']} ${styles['box-min']}`} onClick={btnMinQuantity}>
                                        <p className={styles['min']}>-</p>
                                    </div>
                                    <div className={styles['quantity']}>
                                        <p className={styles['quantity-text']}>{quantity}</p>
                                    </div>
                                    <div className={`${styles['box-color']} ${styles['box-plus']}`} onClick={btnPlusQuantity}>
                                        <p className={styles['plus']}>+</p>
                                    </div>
                                </div>
                                <p className={`mt-5 ${styles['reservation-date']}`}>Reservaion Date :</p>
                                <div className={`mt-3 ${styles['select-date-box']}`}>
                                    <p className={styles['select-date-text']}>Select Date</p>
                                </div>
                                <select className={styles['forms-select-date']} defaultValue={1} onChange={e => setSelectDate(e.target.value)}>
                                    {Array.isArray(dateArr) && dateArr.length > 0 &&
                                        dateArr.map((data) => (
                                            <React.Fragment>
                                                <option value={data} className={styles['select-date-text']}>{`${data} Day`}</option>
                                            </React.Fragment>
                                        ))
                                    }
                                </select>
                            </div>
                        </section>

                        <section className={styles['btn-reservation']} onClick={reservationHandler} style={{ marginBottom: 160 }}>
                            {`Pay now : Rp. ${formatRupiah(totalPrice)}`}
                        </section>
                    </main>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <p>ini owner</p>
                </React.Fragment>
            )}
        </Main>
    )
}

export default Reservation
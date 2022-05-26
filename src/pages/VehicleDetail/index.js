import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import Main from '../../components/Main'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

import vehicleImgDefault from '../../assets/img/vehicle-default.png'
import arrowBack from '../../assets/svg/arrowBack.svg'

import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { vehicleDetail } from '../../modules/utils/vehicle'

import formatRupiah from '../../modules/helper/formatRupiah'
import Swal from 'sweetalert2'

const VehicleDetail = () => {
    const state = useSelector(state => state)
    const params = useParams()
    const navigate = useNavigate()

    const { auth } = state
    const { token, userData } = auth

    const [dataVehicle, setDataVehicle] = useState({})
    const [imgArr, setImgArr] = useState([])
    const [imgIdx, setImgIdx] = useState(0)
    const [vehiclePriceReservation, setVehiclePriceReservation] = useState(0)
    const [stockReservation, setStockReservation] = useState(1)
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')

    useEffect(() => {
        vehicleDetail(params.id)
            .then((res) => {
                setDataVehicle(res.data.result)
                setVehiclePriceReservation(res.data.result.price)
            })
            .catch(({ ...err }) => {
                console.log(err)
            })
    }, [params.id])

    useEffect(() => {
        setImgArr(dataVehicle.images)
        // setImg1(`${process.env.REACT_APP_HOST}/${imgArr[0].images}`)
    }, [dataVehicle.stock, dataVehicle.images])


    const next = () => {
        if (imgArr.length >= imgIdx) {
            setImgIdx(imgIdx + 1)
        }
        if (imgArr.length === imgIdx + 1) {
            setImgIdx(0)
        }
    }
    const prev = () => {
        if (imgArr.length >= imgIdx) {
            setImgIdx(imgIdx - 1)
        }
        if (imgIdx === 0) {
            setImgIdx(imgArr.length - 1)
        }
    }

    const minStockReservation = () => {
        if (stockReservation > 1) {
            setStockReservation(stockReservation - 1)
        }
    }
    const plusStockReservation = () => {
        setStockReservation(stockReservation + 1)
    }

    const reservationHandler = () => {
        if (stockReservation > dataVehicle.stock) {
            Swal.fire({
                icon: 'error',
                title: 'There is an error ?',
                text: 'out of stock'
            })
        } else {
            navigate(`/reservation/id=${dataVehicle.id}&quantity=${stockReservation}`)
        }
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'There is an error ?',
                text: 'You must Login first'
            })
        }
    }

    return (
        <Main>
            <main className='container mt-3 mb-3'>
                <section className={styles['back-home']} style={dataVehicle.owner_id !== userData.id ? { width: 190 } : { width: 230 }}>
                    <img src={arrowBack} className={styles['back-arrow']} alt='avatar' onClick={() => { navigate(-1) }} />
                    <h3 className={styles['item-text']}>{dataVehicle.owner_id !== userData.id ? 'Detail' : 'Edit Item'}</h3>
                </section>

                {dataVehicle.owner_id !== userData.id ? (
                    <React.Fragment>
                        <section className={`mt-5 ${styles['flex-main']}`}>
                            <div className={styles['img-flex']}>
                                <div>
                                    <img src={arrowBack} onClick={prev} className={styles['prev-img']} alt='avatar' />
                                </div>
                                <Carousel className={styles['carousel']} showArrows={true} infiniteLoop={true} selectedItem={imgIdx} onChange={(e) => { setImgIdx(e) }} >
                                    {Array.isArray(imgArr) && imgArr.length > 0 &&
                                        imgArr.map((data, idx) => (
                                            <div key={idx}>
                                                <img src={`${process.env.REACT_APP_HOST}/${data.images}` === null ? vehicleImgDefault : `${process.env.REACT_APP_HOST}/${data.images}`}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null
                                                        currentTarget.src = `${vehicleImgDefault}`
                                                    }} alt='avatar' />
                                            </div>
                                        ))
                                    }
                                </Carousel>
                                <div>
                                    <img src={arrowBack} onClick={next} className={styles['next-img']} alt='avatar' />
                                </div>
                            </div>
                            <div className={styles['right-flex-main']}>
                                <h2 className={styles['vehicle-text']}>{dataVehicle.vehicle}</h2>
                                <p className={styles['location-text']}>{dataVehicle.location}</p>
                                <p className={styles['fourty-four-size']} style={dataVehicle.stock === 0 ? { color: 'red' } : { color: 'green' }}>{dataVehicle.stock === 0 ? 'Non Available' : 'Available'}</p>
                                <p className={styles['fourty-four-size']} style={{ color: 'red' }}>No Prepayment</p>
                                <p className={`text-secondary ${styles['fourty-four-size']}`}>Capacity : {dataVehicle.types_id === 1 ? '4' : dataVehicle.types_id === 2 ? '2' : '1'} person</p>
                                <p className={`text-secondary ${styles['fourty-four-size']}`}>Type : {dataVehicle.types_id === 1 ? 'Car' : dataVehicle.types_id === 2 ? 'Motorbike' : 'Bike'}</p>
                                <p className={`text-secondary ${styles['fourty-four-size']}`}>Reservation before 2 PM</p>
                                <h3 className={styles['reservation-price']}>{`Rp. ${formatRupiah(vehiclePriceReservation)}/day`}</h3>
                                <div className='mt-5' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className={styles['btn-plus']} onClick={plusStockReservation}>
                                        <p>+</p>
                                    </div>
                                    <h3 className={styles['reservation-stock']}>{stockReservation}</h3>
                                    <div className={styles['btn-min']} onClick={minStockReservation}>
                                        <p>-</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className={`${styles['btn-select-reservation']}`}>
                            <button className={styles['btn-chat-admin']} >Chat Admin</button>
                            <button className={styles['btn-reservation']} onClick={reservationHandler}>Reservation</button>
                            <div className={styles['btn-like']}>
                                <svg className={styles['like-icon']} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                </svg>
                                Like
                            </div>
                        </section>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <p>non user</p>
                    </React.Fragment>
                )}
            </main>

        </Main >
    )
}

export default VehicleDetail
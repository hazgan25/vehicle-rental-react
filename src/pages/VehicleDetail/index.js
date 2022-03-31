import React, { useState, useEffect } from 'react'
import './VehicleDetail.scoped.scss'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { vehicleDetail } from '../../modules/utils/vehicle'

import Main from '../../components/Main'
import vehicleImgDefault from '../../assets/img/vehicle-default.png'
import arrowBack from '../../assets/svg/arrowBack.svg'

import formatRupiah from '../../modules/helper/formatRupiah'
import Swal from 'sweetalert2'

const VehicleDetail = () => {
    const state = useSelector(state => state)
    const params = useParams()
    const navigate = useNavigate()

    const { id } = params
    const { userData, token } = state.auth

    console.log(params)

    const [dataVehicle, setDataVehicle] = useState({})
    const [vehicleImgArr, setVehicleImgArr] = useState([])
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [selectDate, setSelectDate] = useState(1)

    let dateArr = []
    for (let i = 1; i <= 7; i++) {
        dateArr.push(i)
    }

    const { vehicle, location, price, stock } = dataVehicle
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
        if (dataVehicle !== {} && vehicleImgArr[1] && vehicleImgArr[1] !== {}) {
            const image2 = vehicleImgArr[1].images
            setImg2(image2)
        }
        if (dataVehicle !== {} && vehicleImgArr[2] && vehicleImgArr[2] !== {}) {
            const image3 = vehicleImgArr[2].images
            setImg3(image3)
        }
    }, [vehicleImgArr])

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
    }

    return (
        <Main>
            {userData && userData.role !== 'owner' ? (
                <React.Fragment>
                    <main className='container mt-3'>
                        <section className='backHome justify-content-between'>
                            <Link to='/'>
                                <img src={arrowBack} alt='avatar' className='backArrow' />
                            </Link>
                            <h3 className='addNewItem'>Reservation</h3>
                        </section>

                        <section className='flex-reservation mt-5'>
                            <img src={vehicleImgDefault} alt='avater' className='img-reservation' style={{ position: 'absolute' }} />
                            <img src={img1 ? `${process.env.REACT_APP_HOST}/${img1}` : vehicleImgDefault} alt='avater' className='img-reservation' />
                            <div className='dekstop-mode-reservation-pos-rel'>
                                <h3 className='vehicle-text-reservation'>{vehicle}</h3>
                                <h4 className='location-text-reservation mt-5'>{location}</h4>
                                <h5 className='no-prepayment-reservation mt-4'>No Prepayment</h5>
                                <div className='flex-quantity mt-5'>
                                    <div className='box-min box-color' onClick={btnMinQuantity}>
                                        <p className='min'>-</p>
                                    </div>
                                    <div className='quantity'>
                                        <p className='quantity-text'>{quantity}</p>
                                    </div>
                                    <div className='box-plus box-color' onClick={btnPlusQuantity}>
                                        <p className='plus'>+</p>
                                    </div>
                                </div>
                                <p className='reservation-date mt-5'>Reservaion Date :</p>
                                <div className='select-date-box mt-5'>
                                    <p className='select-date-text'>Select Date</p>
                                </div>
                                <select className='forms-select-date' defaultValue={1} onChange={e => setSelectDate(e.target.value)}>
                                    {Array.isArray(dateArr) && dateArr.length > 0 &&
                                        dateArr.map((data) => (
                                            <React.Fragment>
                                                <option value={data} className='select-date-text'>{`${data} Day`}</option>
                                            </React.Fragment>
                                        ))
                                    }
                                </select>
                            </div>
                        </section>

                        <section className='btn-reservation' onClick={reservationHandler}>
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

export default VehicleDetail
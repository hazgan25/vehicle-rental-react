import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import Main from '../../components/Main'
import Carousel from '../../components/Carousel'

import vehicleImgDefault from '../../assets/img/vehicle-default.png'
import arrowBack from '../../assets/svg/arrowBack.svg'

import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { vehicleDetail, vehicleEdit, vehicleDelete } from '../../modules/utils/vehicle'
import { getLocationByRenterId, postLocationbyRenterId } from '../../modules/utils/location'
import { listVehiclePopularAction, listVehicleCarAction, listVehicleMotorbikeAction, listVehicleBikeAction } from '../../redux/actions/listVehicles'
import { paramsPopulerVehicle, paramCarVehicle, paramMotorbikeVehicle, paramBikeVehicle } from '../../modules/helper/listVehicle'

import formatRupiah from '../../modules/helper/formatRupiah'
import Swal from 'sweetalert2'
import { Modal, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'

import addMore from '../../assets/img/add-more.png'

const VehicleDetail = () => {
    const state = useSelector(state => state)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { auth } = state
    const { token, userData } = auth

    const [dataVehicle, setDataVehicle] = useState({})
    const [imgArr, setImgArr] = useState([])
    const [vehiclePriceReservation, setVehiclePriceReservation] = useState(0)
    const [stockReservation, setStockReservation] = useState(1)

    const [showImg1, setShowImg1] = useState(addMore)
    const [showImg2, setShowImg2] = useState(addMore)
    const [showImg3, setShowImg3] = useState(addMore)
    const [imgFile1, setImgFile1] = useState('')
    const [imgFile2, setImgFile2] = useState('')
    const [imgFile3, setImgFile3] = useState('')
    const [isEditImg1, setIsEditImg1] = useState(false)
    const [isEditImg2, SetIsEditImg2] = useState(false)
    const [isEditImg3, setIsEditImg3] = useState(false)

    const [locationArr, setLocationArr] = useState([])
    const [selectLocation, setSelectLocation] = useState('')
    const [addLocation, setAddLocation] = useState('')
    const [modalAddLocation, setModalAddLocation] = useState(false)

    const [vehicleName, setVehicleName] = useState('')
    const [vehicleDesc, setVehicleDesc] = useState('')
    const [vehiclePrice, setVehiclePrice] = useState(0)
    const [vehicleStock, setVehicleStock] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    useEffect(() => {
        vehicleDetail(params.id)
            .then((res) => {
                setDataVehicle(res.data.result)
                setVehiclePriceReservation(res.data.result.price)
                window.scrollTo(0, 0)
            })
            .catch(({ ...err }) => {
                if (err) {
                    navigate(-1)
                }
            })

        if (token && userData.id === dataVehicle.owner_id) {
            getLocationByRenterId(token)
                .then((res) => {
                    setLocationArr(res.data.result)
                })
                .catch(({ ...err }) => {
                    console.log(err)
                })
        }
    }, [params.id, token, userData.id, dataVehicle.owner_id, navigate])

    useEffect(() => {
        const { images, vehicle, description, locations_id, types_id, price, stock } = dataVehicle
        setImgArr(images)
        setVehicleName(vehicle)
        setVehicleDesc(description)
        setSelectLocation(locations_id)
        setVehiclePrice(price)
        setVehicleStock(stock)
        setVehicleType(types_id)
    }, [dataVehicle])

    useEffect(() => {
        if (selectLocation === 'add on') {
            setModalAddLocation(true)
        } else {
            setModalAddLocation(false)
        }
    }, [selectLocation])


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
            navigate(`/reservation/vehicle=${dataVehicle.id}&quantity=${stockReservation}`)
        }
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'There is an error ?',
                text: 'You must Login first'
            })
        }
    }
    const imageHandler1 = (e) => {
        const fileImg = e.target.files[0]
        setShowImg1(URL.createObjectURL(fileImg))
        setImgFile1(fileImg)
    }
    const imageHandler2 = (e) => {
        const fileImg = e.target.files[0]
        setShowImg2(URL.createObjectURL(fileImg))
        setImgFile2(fileImg)
    }
    const imageHandler3 = (e) => {
        const fileImg = e.target.files[0]
        setShowImg3(URL.createObjectURL(fileImg))
        setImgFile3(fileImg)
    }

    const addLocationHandler = () => {
        const body = {
            'name': addLocation
        }
        postLocationbyRenterId(body, token)
            .then((res) => {
                Swal.fire(
                    'Success',
                    `${res.data.result.msg}`,
                    'success'
                )
                setAddLocation('')
                setSelectLocation(dataVehicle.locations_id)
                getLocationByRenterId(token)
                    .then((res) => {
                        setLocationArr(res.data.result)
                    })
                    .catch(({ ...err }) => {
                        console.log(err)
                    })
            })
            .catch(({ ...err }) => {
                toast.error(`${err.response.data.result}`, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
    }

    const deleteHandler = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: true
        })

        swalWithBootstrapButtons.fire({
            title: 'Are You sure delete this vehicle?',
            text: `After deleting the data can't be returned`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Deleted!',
            cancelButtonText: 'No, Cancel!',
            reverseButtons: false
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Success',
                    'delete success',
                    'success'
                )
                const { id } = dataVehicle
                vehicleDelete(id, token)
                    .then((res) => {
                        swalWithBootstrapButtons.fire(
                            `Success`,
                            `${res.data.result.msg}`,
                            'success'
                        )
                        dispatch(listVehiclePopularAction(paramsPopulerVehicle))
                        dispatch(listVehicleCarAction(paramCarVehicle))
                        dispatch(listVehicleMotorbikeAction(paramMotorbikeVehicle))
                        dispatch(listVehicleBikeAction(paramBikeVehicle))
                        setTimeout(() => {
                            navigate('/')
                        }, 2500)
                    })
                    .catch(({ ...err }) => {
                        console.log(err)
                    })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'ok, your data is still available',
                    'info',
                )
            }
        })
    }

    const saveChangeHandler = () => {
        const body = new FormData()
        body.append('name', vehicleName)
        body.append('description', vehicleDesc)
        body.append('locations_id', selectLocation)
        body.append('types_id', vehicleType)
        if (imgFile1 !== '') body.append('images', imgFile1)
        if (imgFile2 !== '') body.append('images', imgFile2)
        if (imgFile3 !== '') body.append('images', imgFile3)
        body.append('price', vehiclePrice)
        body.append('stock', vehicleStock)

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: true
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you Sure Edit Vehicle?',
            text: 'if sure press Save',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save Change',
            cancelButtonText: 'No, Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                vehicleEdit(dataVehicle.id, body, token)
                    .then((res) => {
                        Swal.fire(
                            'Success Edit Vehicle',
                            `${res.data.result.msg}`,
                            'success'
                        )
                        vehicleDetail(params.id)
                            .then((res) => {
                                setDataVehicle(res.data.result)
                                setVehiclePriceReservation(res.data.result.price)
                                window.scrollTo(0, 0)
                            })
                            .catch(({ ...err }) => {
                                if (err) {
                                    navigate(-1)
                                }
                            })
                    })
                    .catch(({ ...err }) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'There is an Error ?',
                            text: `${err.response.data.msg}`
                        })
                    })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Ok, your data has not been changed',
                    'info'
                )
            }
        })
    }


    return (
        <Main>
            <main className='container mt-3 mb-3'>
                <section className={styles['back-home']} style={dataVehicle.owner_id === userData.id ? { width: 230 } : { width: 190 }}>
                    <img src={arrowBack} className={styles['back-arrow']} alt='avatar' onClick={() => { navigate(-1) }} />
                    <h3 className={styles['item-text']}>{dataVehicle.owner_id === userData.id ? 'Edit Item' : 'Detail'}</h3>
                </section>

                {token && dataVehicle.owner_id === userData.id ? (
                    <React.Fragment>
                        <section className={`mt-5 ${styles['flex-main']}`}>
                            <div className={styles['edit-left']}>
                                <label className={styles['label-img-edit-main']} for='file-input-1'>
                                    {isEditImg1 === false && (
                                        <span className={styles['change-img-button-main']}>
                                            <button className={styles['btn-change-img-main']} onClick={() => { setIsEditImg1(true) }}>X</button>
                                        </span>
                                    )}
                                    <img src={isEditImg1 === false ? `${process.env.REACT_APP_HOST}/${dataVehicle.images[0].images}` : showImg1}
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null
                                            currentTarget.src = `${vehicleImgDefault}`
                                        }} alt='avatar'
                                        className={styles['img-edit-main']} />
                                    <input type={'file'} id='file-input-1' disabled={isEditImg1 === false ? true : false} style={{ display: 'none' }} onChange={e => imageHandler1(e)} />
                                </label>

                                <div className={`mt-3 ${styles['edit-img-flex']}`}>
                                    {dataVehicle.images[1] !== undefined ? (
                                        <label className={styles['label-img-edit-two']} for='file-input-2'>
                                            {isEditImg2 === false && (
                                                <span className={styles['change-img-button']}>
                                                    <button className={styles['btn-change-img']} onClick={() => { SetIsEditImg2(true) }}>X</button>
                                                </span>
                                            )}
                                            <img src={isEditImg2 === false ? `${process.env.REACT_APP_HOST}/${dataVehicle.images[1].images}` : showImg2}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null
                                                    currentTarget.src = `${vehicleImgDefault}`
                                                }} alt='avatar'
                                                className={styles['img-edit-two']} />
                                            <input type={'file'} id='file-input-2' disabled={isEditImg2 === false ? true : false} style={{ display: 'none' }} onChange={e => imageHandler2(e)} />
                                        </label>
                                    ) : (
                                        <label className={styles['label-img-edit-two']} for='file-input-2'>
                                            <img src={showImg2} className={styles['img-edit-two']} alt='avatar' />
                                            <input type={'file'} id="file-input-2" style={{ display: 'none' }} onChange={e => imageHandler2(e)} />
                                        </label>
                                    )}

                                    {dataVehicle.images[2] !== undefined ? (
                                        <label className={styles['label-img-edit-two']} for='file-input-3'>
                                            {isEditImg3 === false && (
                                                <span className={styles['change-img-button']}>
                                                    <button className={styles['btn-change-img']} onClick={() => { setIsEditImg3(true) }}>X</button>
                                                </span>
                                            )}
                                            <img src={isEditImg3 === false ? `${process.env.REACT_APP_HOST}/${dataVehicle.images[2].images}` : showImg3}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null
                                                    currentTarget.src = `${vehicleImgDefault}`
                                                }} alt='avatar'
                                                className={styles['img-edit-two']} />
                                            <input type={'file'} id='file-input-3' disabled={isEditImg3 === false ? true : false} style={{ display: 'none' }} onChange={e => imageHandler3(e)} />
                                        </label>
                                    ) : (
                                        <label className={styles['label-img-edit-two']} for='file-input-3'>
                                            <img src={showImg3} className={styles['img-edit-two']} alt='avatar' />
                                            <input type={'file'} id="file-input-3" style={{ display: 'none' }} onChange={e => imageHandler3(e)} />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className={styles['edit-right']}>
                                <input className={styles['input-edit']} placeholder='Type the Name Vehicle' value={vehicleName} onChange={e => setVehicleName(e.target.value)} />
                                <select className={`mt-3 ${styles['input-edit']}`} value={selectLocation} onChange={e => setSelectLocation(e.target.value)}>
                                    {Array.isArray(locationArr) && locationArr.length > 0 &&
                                        locationArr.map((data) => (
                                            <React.Fragment key={data.id}>
                                                <option value={data.id}>{data.name}</option>
                                            </React.Fragment>
                                        ))
                                    }
                                    <option value={'add on'}>Add New Location +</option>
                                </select>
                                <input className={`mt-3 ${styles['input-edit']}`} placeholder='Type the Description' value={vehicleDesc} onChange={e => setVehicleDesc(e.target.value)} />
                                <label className={`mt-3 ${styles['label-text']}`}>Price :</label>
                                <input className={`mt-3 ${styles['input-edit-box']}`} type='number' placeholder='Type the Price' value={vehiclePrice} onChange={e => setVehiclePrice(e.target.value)} />
                                <label className={`mt-3 ${styles['label-text']}`}>Status :</label>
                                <select className={`mt-3 ${styles['input-edit-box']}`}>
                                    <option disabled>Select Status</option>
                                    <option style={{ color: 'green' }}>Available</option>
                                    <option style={{ color: 'red' }}>Full Booked</option>
                                </select>
                                <div className={styles['stock-flex']}>
                                    <label className={`mt-3 ${styles['label-text']}`}>Stock :</label>
                                    <div className={`mt-3 ${styles['box-flex']}`}>
                                        <div className={styles['box-plus']} onClick={() => { setVehicleStock(vehicleStock + 1) }}>+</div>
                                        <p>{vehicleStock}</p>
                                        <div className={styles['box-plus']} onClick={() => {
                                            if (vehicleStock > 0) {
                                                setVehicleStock(vehicleStock - 1)
                                            }
                                        }}>-</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className={`mt-3 ${styles['btn-flex']}`}>
                            <select className={styles['btn-item-to']} value={vehicleType} onChange={e => setVehicleType(e.target.value)}>
                                <option value={1}>Car</option>
                                <option value={2}>Motorbike</option>
                                <option value={3}>Bike</option>
                            </select>
                            <button className={styles['btn-save-change']} onClick={saveChangeHandler}>Save Change</button>
                            <button className={styles['btn-delete']} onClick={deleteHandler}>Delete</button>
                        </section>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <section className={`mt-5 ${styles['flex-main']}`}>
                            <div className={styles['edit-left']}>
                                {/* Carousel */}
                                <Carousel data={imgArr} />
                                {/* Carousel */}
                            </div>

                            <div className={styles['edit-right']}>
                                <h2 className={styles['vehicle-text']}>{dataVehicle.vehicle}</h2>
                                <p className={styles['location-text']}>{dataVehicle.location}</p>
                                <p className={styles['fourty-four-size']} style={dataVehicle.stock === 0 ? { color: 'red' } : { color: 'green' }}>{dataVehicle.stock === 0 ? 'Non Available' : 'Available'}</p>
                                <p className={styles['fourty-four-size']} style={{ color: 'red' }}>No Prepayment</p>
                                <p className={`text-secondary ${styles['fourty-four-size']}`}>Capacity : {dataVehicle.types_id === 1 ? '4' : dataVehicle.types_id === 2 ? '2' : '1'} person</p>
                                <p className={`text-secondary ${styles['fourty-four-size']}`}>Type : {dataVehicle.types_id === 1 ? 'Car' : dataVehicle.types_id === 2 ? 'Motorbike' : 'Bike'}</p>
                                <p className={`text-secondary ${styles['fourty-four-size']}`}>{dataVehicle.description}</p>
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
                                <svg className={`bi bi-heart-fill ${styles['like-icon']}`} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                </svg>
                                Like
                            </div>
                        </section>
                    </React.Fragment>
                )}
            </main>

            <Modal show={modalAddLocation} onHide={() => { setSelectLocation(dataVehicle.locations_id) }} size='xl' aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>Add New Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Name Location :</h5>
                    <input type={'text'} style={{ width: '100%' }} onChange={e => setAddLocation(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-secondary' onClick={() => {
                        setSelectLocation(dataVehicle.locations_id)
                        setAddLocation('')
                    }}>Cancel</Button>
                    <Button className='btn-warning' onClick={addLocationHandler}>Add Location</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </Main >
    )
}

export default VehicleDetail
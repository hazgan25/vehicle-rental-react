import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Main from '../../components/Main'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userAction, logoutAction } from '../../redux/actions/auth'
import { editUserProfile, editPasswordUser } from '../../modules/utils/user'

import profileDefaultImg from '../../assets/img/profile-default.png'
import pencilIcon from '../../assets/svg/pencil.svg'

import Swal from 'sweetalert2'
import { Modal, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

const EditProfile = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showImg, setShowImg] = useState(profileDefaultImg)
    const [imgFile, setImgFile] = useState('')
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [selectGender, setSelectGender] = useState('')
    const [userDob, setUserDob] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [userPhone, setUserPhone] = useState('')

    const [isModal, setIsModal] = useState(false)
    const [curPass, setCurrPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [rePass, setRePass] = useState('')

    const { auth } = state
    const { token, userData } = auth

    const { active_year, address, dob, email, gender, image, name, phone } = userData

    useEffect(() => {
        if (name !== null) setUserName(name)
        if (gender === 'male') setSelectGender(1)
        if (gender === 'female') setSelectGender(2)
        if (gender === 'confidential') setSelectGender(3)
        if (image !== null) setShowImg(`${process.env.REACT_APP_HOST}/${image}`)
        if (dob !== null) setUserDob(dob)
        if (address !== null) setUserAddress(address)
        setUserEmail(email)
        setUserPhone(phone)
    }, [address, dob, email, gender, image, name, phone])

    const imageHandler = (e) => {
        const fileImg = e.target.files[0]
        setShowImg(URL.createObjectURL(fileImg))
        setImgFile(fileImg)
    }

    const saveHandler = () => {
        const body = new FormData()
        body.append('name', userName)
        body.append('email', userEmail)
        body.append('phone', userPhone)
        body.append('gender_id', selectGender)
        body.append('dob', userDob)
        body.append('address', userAddress)
        if (imgFile !== '') body.append('image', imgFile)

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: true
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure change profile?',
            // text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Change Profile',
            cancelButtonText: 'No, Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                editUserProfile(body, token)
                    .then((res) => {
                        swalWithBootstrapButtons.fire(
                            'Success!',
                            `${res.data.result.msg}`,
                            'success'
                        )
                        dispatch(userAction(token))
                    })
                    .catch(({ ...err }) => {
                        swalWithBootstrapButtons.fire(
                            'There is an error ?',
                            `${err.response.data.result}`,
                            'question'
                        )
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your profile cancel change',
                    'info'
                )
            }
        })
    }

    const editPasswordHandler = () => {
        if (curPass === '' || newPass === '' || rePass === '') {
            toast.error('All must be filled!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        if (newPass !== rePass) {
            toast.error('Re-type Password is Wrong!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        if (curPass !== '' && newPass !== '' && rePass !== '') {
            const body = {
                'currentPass': curPass,
                'newPass': newPass
            }
            editPasswordUser(body, token)
                .then((res) => {
                    Swal.fire(
                        `${res.data.result.msg}`,
                        'Please Login Again!',
                        'success'
                    )
                    setIsModal(false)
                    setCurrPass('')
                    setNewPass('')
                    setRePass('')
                    dispatch(logoutAction(token))
                    localStorage.clear('persist:root')
                    setTimeout(() => {
                        navigate('/login')
                        window.location.reload(true)
                    }, 1500)
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
    }

    const cancelPassHandler = () => {
        setCurrPass('')
        setNewPass('')
        setRePass('')
        setIsModal(false)
    }

    const cancelHandler = () => {
        if (name !== null) setUserName(name)
        if (gender === 'male') setSelectGender(1)
        if (gender === 'female') setSelectGender(2)
        if (gender === 'confidential') setSelectGender(3)
        if (image !== null) {
            setShowImg(`${process.env.REACT_APP_HOST}/${image}`)
        } else {
            setShowImg(profileDefaultImg)
        }
        if (dob !== null) setUserDob(dob)
        if (address !== null) setUserAddress(address)
        setUserEmail(email)
        setUserPhone(phone)
    }

    return (
        <Main>
            <main className='container' style={{ marginBottom: 220 }}>
                <h1 className={styles['profile-font']}>Profile</h1>
                <section className={styles['profile-edit']}>
                    <div>
                        <img src={showImg} alt='avatar' className={styles['photo-profile']}
                            onError={e => {
                                e.onError = null
                                setShowImg(profileDefaultImg)
                            }} />
                        <div className={styles['box-pencil']}>
                            <input type={'file'} style={{ position: 'absolute', width: 46, height: 46, zIndex: 3, opacity: 0 }} onChange={e => imageHandler(e)} />
                            <img src={pencilIcon} alt='avatar' style={{ width: 16, height: 17 }} />
                        </div>
                    </div>

                    <div className={styles['user-data']}>
                        <h1 className={styles['user-name']}>{name === null || name === '' ? 'No Name' : name}</h1>
                        <p className={styles['info-data']}>{email}</p>
                        <p className={styles['info-data']}>{phone === null || phone === '' ? 'No Phone' : phone}</p>
                        <p className={styles['info-data']}>{`Has been active since ${active_year}`}</p>
                    </div>
                </section>

                <section className={styles['form-gender']}>
                    <label className={styles['gender']}>
                        <div className={styles['radio-orange-male']}>
                            <input type={'radio'} checked='checked' name='radio' className={styles['select-gender']} onChange={() => setSelectGender(1)} />
                            <span className={styles['check-mark']} />
                            <p id={styles['male-text']}>Male</p>
                        </div>
                    </label>
                    <label className={styles['gender']}>
                        <div className={styles['radio-orange-female']}>
                            <input type={'radio'} checked='checked' name='radio' className={styles['select-gender']} onChange={() => setSelectGender(2)} />
                            <span className={styles['check-mark']} />
                            <p id={styles['female-text']}>female</p>
                        </div>
                    </label>
                </section>

                <section style={{ position: 'relative', top: 154 }}>
                    <section className='container'>
                        <div className={styles['contacts-edit']}>
                            <h5 className={styles['contacts']}>Contacts</h5>
                            <label className={styles['label']}>Email address : </label>
                            <input type={'email'} className={styles['input-contacts']} value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                            <label className={styles['label']} style={{ marginTop: 53 }}>Address : </label>
                            <input type={'text'} className={styles['input-contacts']} value={userAddress} onChange={e => setUserAddress(e.target.value)} />
                            <label className={styles['label']} style={{ marginTop: 53 }}>Mobile number : </label>
                            <input type={'number'} className={styles['input-contacts']} value={userPhone} onChange={e => setUserPhone(e.target.value)} />
                        </div>
                        <div className={styles['contacts-edit']} style={{ marginTop: 53 }}>
                            <h5 className={styles['contacts']}>Identity</h5>
                            <div className={styles['identity-edit']}>
                                <label className={styles['label']}>Display name : </label>
                                <label className={styles['large-date']}>DD/MM/YY</label>
                                <input type={'text'} className={styles['input-identity']} value={userName} onChange={e => setUserName(e.target.value)} />
                                <input type={'date'} className={styles['input-identity']} value={userDob} onChange={e => setUserDob(e.target.value)} />
                            </div>
                            <div className={styles['select-button']}>
                                <button className={styles['btn-save-change']} onClick={saveHandler}>Save Change</button>
                                <button className={styles['btn-edit-password']} onClick={() => setIsModal(true)}>Edit Password</button>
                                <button className={styles['btn-cancel']} onClick={cancelHandler}>Cancel</button>
                            </div>
                        </div>
                    </section>

                    <Modal show={isModal} onHide={() => { setIsModal(false) }} size='xl' aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Change Your Password
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Current Password :</h5>
                            <input type={'password'} style={{ width: '100%' }} onChange={e => setCurrPass(e.target.value)} />
                            <h5 style={{ marginTop: 13 }}>New Password :</h5>
                            <input type={'password'} style={{ width: '100%' }} onChange={e => setNewPass(e.target.value)} />
                            <h5 style={{ marginTop: 13 }}>Re-type Password :</h5>
                            <input type={'password'} style={{ width: '100%' }} onChange={e => setRePass(e.target.value)} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className='btn-secondary' onClick={cancelPassHandler}>Cancel</Button>
                            <Button className='btn-warning' onClick={editPasswordHandler}>Confirm</Button>
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

                </section>
            </main>
        </Main>
    )
}


export default EditProfile
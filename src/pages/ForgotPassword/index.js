import React, { useState, useEffect } from 'react'
import Footer from '../../components/Footer'
import styles from './index.module.scss'

import Swal from 'sweetalert2'
import { Modal, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

import { ForgotPass, resetPass } from '../../modules/utils/auth'

const ForgotPassword = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [pin, setPin] = useState('')
    const [password, setPassword] = useState('')
    const [otpSuccess, setOtpSuccess] = useState('')
    const [isModal, setIsmodal] = useState(false)

    useEffect(() => {
        if (otpSuccess !== '') {
            setIsmodal(true)
        } else {
            setIsmodal(false)
        }
    }, [otpSuccess])

    const backBeforeHandler = () => {
        navigate(-1)
    }

    const sendHanlder = () => {
        if (email !== '') {
            const body = {
                'email': email
            }
            ForgotPass(body)
                .then((res) => {
                    setOtpSuccess(res.data.result.msg)
                })
                .catch(({ ...err }) => {
                    Swal.fire(
                        'There is an error?',
                        `${err.response.data.err}`,
                        'question'
                    )
                })
        } else {
            Swal.fire(
                'There is an error?',
                'e-mail cannot be empty',
                'question'
            )
        }
    }

    const resetPassHandler = () => {
        const body = {
            'pin': pin,
            'password': password
        }
        resetPass(body)
            .then((res) => {
                setOtpSuccess('')
                Swal.fire(
                    `${res.data.result.msg}`,
                    'Please Login Again!',
                    'success'
                )
                setTimeout(() => {
                    navigate('/login')
                }, 2500)
            })
            .catch(({ ...err }) => {
                toast.error(`${err.response.data.err}`, {
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

    return (
        <React.Fragment>
            <main className={styles['forgotPass-bg']}>
                <div className={styles['transparan-bg']}>
                    <div className='container'>
                        <div className={styles['arrow-back-login']} onClick={backBeforeHandler}>
                            <span className={styles['bck-arrow-up']} />
                            <span className={styles['bck-arrow-down']} />
                            <p className={styles['back-login']} onClick={backBeforeHandler}>Back</p>
                        </div>
                        <div className='container'
                            style={{
                                position: 'relative', top: '141px', textAlign: 'center'
                            }}>
                            <h1 className={styles['dontWorry']}>Do&#x2019;t worry, we got your back!</h1>
                            <input placeholder='Enter your email address' value={email} className={styles['emailReq']} onChange={e => setEmail(e.target.value)} />
                            <button className={styles['btn-resend-pass']} onClick={sendHanlder}>Send Link</button>
                            <p className={styles['resend-pass']}>You will receive a link to reset your password.</p>
                        </div>
                    </div>
                </div>

                <Modal show={isModal} onHide={() => { setOtpSuccess('') }} size='md' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Reset Password
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>
                            <h5>Input OTP : </h5>
                        </label>
                        <input style={{
                            padding: 3,
                            borderRadius: 10,
                            marginLeft: 12
                        }} onChange={e => setPin(e.target.value)} />
                        <h5 style={{ marginTop: 12 }}>New Password : </h5>
                        <input type={'password'} style={{
                            padding: 5,
                            borderRadius: 10,
                            width: '100%'
                        }} onChange={e => setPassword(e.target.value)} />
                        <p style={{ textAlign: 'center', fontSize: 12, marginTop: 12 }} >{otpSuccess}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='btn-dark text-warning w-25' onClick={() => {
                            setOtpSuccess('')
                        }}>Cancel</Button>
                        <Button className='btn-warning w-25' onClick={resetPassHandler}>Confirm</Button>
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
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default ForgotPassword
import React from 'react'
import styles from './index.module.scss'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAction } from '../../redux/actions/auth'

import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'

import Footer from '../../components/Footer'

// import googleIcon from '../../assets/img/google-icon.png'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        const body = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        dispatch(loginAction(body))
            .then((res) => {
                toast.success(`${res.action.payload.data.result.msg}`, {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            })
            .catch(({ ...err }) => {
                Swal.fire({
                    icon: 'error',
                    title: 'There is an error ?',
                    text: `${err.response.data.err}`,
                })
            })
    }

    return (
        <React.Fragment>
            <main className={styles['login-bg']}>
                <div className={`container-fluid ${styles['transparan-bg']}`}>
                    <section className={`container ${styles['content-login']}`}>
                        <div className='row'>
                            <div className={`col-sm ${styles['guest-form']}`}>
                                <h1 className={styles['explore-world']}>Le&#x2019;ts Explore The World</h1>
                                <p className={styles['guest']}>Don&#x2019;t have account?</p>
                                <Link to="/register">
                                    <button className={styles['btn-gray']}>Sign Up</button>
                                </Link>
                            </div>
                            <div className={`col-sm ${styles['line-center']}`}>
                                <span className={styles.dotup}></span>
                                <span className={styles.dotdown}></span>
                            </div>
                            <div className='col-sm'>
                                <form className={styles['input-form-login']} onSubmit={submitHandler}>
                                    <input type="text" name="email" id="email" className={styles['input']} placeholder="Email" required />
                                    <input type="password" name="passwor" id="password" className={styles['input']} placeholder="Password" required />
                                    <Link to="/forgot/password" className={styles['forgot-pass']}>
                                        <p className="forgot-pass">Forgot Password?</p>
                                    </Link>
                                    <button type="submit" className={styles['btn-yellow']}>Login</button>
                                    {/* <button type="button" className={styles['btn-login-google']}>
                                        <img src={googleIcon} alt="Google Login" />
                                        Login With Google
                                    </button> */}
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
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
            </main >
            <Footer />
        </React.Fragment>
    )
}

export default Login
import React from 'react'
import styles from './index.module.scss'
import stylesLogin from '../Login/index.module.scss'

import { Link } from 'react-router-dom'
import { SignUp } from '../../modules/utils/auth'

import Swal from 'sweetalert2'
import Footer from '../../components/Footer'

// import googleIcon from '../../assets/img/google-icon.png'

const Register = () => {

    const submitHandler = (e) => {
        e.preventDefault()
        const body = {
            name: e.target.name.value,
            phone: '',
            email: e.target.email.value,
            password: e.target.password.value
        }
        SignUp(body)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Register Success',
                    text: `${res.data.result.msg}`
                })
            })
            .catch(({ ...err }) => {
                Swal.fire({
                    icon: 'error',
                    title: 'There is an error ?',
                    text: `${err.response.data.err}`
                })
            })
    }

    return (
        <React.Fragment>
            <main className={stylesLogin['login-bg']}>
                <div className={`container-fluid ${stylesLogin['transparan-bg']}`}>
                    <section className={`container ${styles['content-register']}`}>
                        <div className="row">
                            <div className={`col-sm ${stylesLogin['guest-form']}`}>
                                <h1 className={stylesLogin['explore-world']}>Le&#x2019;ts Explore The World</h1>
                                <p className={stylesLogin['guest']}>Have an account?</p>
                                < Link to='/login'>
                                    <button className={stylesLogin['btn-gray']}>Login</button>
                                </Link>
                            </div>
                            <div className={`col-sm ${stylesLogin['line-center']}`}>
                                <span className={`${stylesLogin['dotup']} ${styles['dotup']}`}></span>
                                <span className={`${stylesLogin['dotdown']} ${styles['dotdown']}`}></span>
                            </div>
                            <form className={`col-sm ${stylesLogin['input-form']}`} onSubmit={submitHandler}>
                                <input type="text" name='name' id='name' className={stylesLogin['input']} placeholder="Name" required />
                                <input type="text" name='email' id='email' className={stylesLogin['input']} placeholder="Email" required />
                                <input type="Password" name='password' id='password' className={stylesLogin['input']} placeholder="Password" required />
                                <Link to="/forgot/password" className={stylesLogin['forgot-pass']}>
                                    <p className={stylesLogin['forgot-pass']}>Forgot Password?</p>
                                </Link>
                                <button type="submit" className={stylesLogin['btn-yellow']}>Sign Up</button>
                                {/* <button type="button" className={stylesLogin['btn-login-google']}>
                                    <img src={googleIcon} alt="Google Login" />
                                    Sign Up With Google
                                </button> */}
                            </form>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Register
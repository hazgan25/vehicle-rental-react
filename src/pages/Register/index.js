import React from 'react'
import { Link } from 'react-router-dom'
import { SignUp } from '../../modules/utils/auth'

import Swal from 'sweetalert2'
import Footer from '../../components/Footer'

import googleIcon from '../../assets/img/google-icon.png'

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
                console.log(res)
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
            <main className="login-bg">
                <div className="transparan-bg">
                    <section className="container content-login">
                        <div className="row">
                            <div className="col-sm guest-form">
                                <h1 className="explore-world">Le’ts Explore The World</h1>
                                <p className="guest">Don’t have account?</p>
                                < Link to='/login'>
                                    <button className="btn-gray">Login</button>
                                </Link>
                            </div>
                            <div className="col-sm line-center">
                                <span className="dotup"></span>
                                <span className="dotdown"></span>
                            </div>
                            <form className="col-sm login-form" onSubmit={submitHandler}>
                                <input type="text" name='name' id='name' className="input-login" placeholder="Name" required />
                                <input type="text" name='email' id='email' className="input-login" placeholder="Email" required />
                                <input type="Password" name='password' id='password' className="input-login" placeholder="Password" required />
                                <Link to="/" className='forgot-pass'>
                                    <p className="forgot-pass">Forgot Password?</p>
                                </Link>
                                <button type="submit" className="btn-yellow">Sign Up</button>
                                <button type="button" className="btn-login-google">
                                    <img src={googleIcon} alt="Google Login" />
                                    Sign Up With Google
                                </button>
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
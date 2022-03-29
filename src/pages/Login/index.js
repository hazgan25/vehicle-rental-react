import React from 'react'
import { Link } from 'react-router-dom'
import './login.scoped.css'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAction } from '../../redux/actions/auth'

import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'

import Footer from '../../components/Footer'

import googleIcon from '../../assets/img/google-icon.png'

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
                    navigate(-1)
                }, 1500)
            })
            .catch(({ ...err }) => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'There is an error ?',
                    text: `${err.response.data.err}`,
                })
            })
    }

    return (
        <React.Fragment>
            <main className='login-bg'>
                <div className='transparan-bg container-fluid'>
                    <section className='container content-login'>
                        <div className='row'>
                            <div className="col-sm guest-form">
                                <h1 className="explore-world">Le’ts Explore The World</h1>
                                <p className="guest">Don’t have account?</p>
                                <Link to="/register">
                                    <button className="btn-gray">Sign Up</button>
                                </Link>
                            </div>
                            <div className="col-sm line-center">
                                <span className="dotup"></span>
                                <span className="dotdown"></span>
                            </div>
                            <div className='col-sm'>
                                <form className='input-form-login' onSubmit={submitHandler}>
                                    <input type="text" name="email" id="email" className="input-login" placeholder="Email" required />
                                    <input type="password" name="passwor" id="password" className="input-login" placeholder="Password" required />
                                    <Link to="/password" className='forgot-pass'>
                                        <p className="forgot-pass">Forgot Password?</p>
                                    </Link>
                                    <button type="submit" className="btn-yellow">Login</button>
                                    <button type="button" className="btn-login-google">
                                        <img src={googleIcon} alt="Google Login" />
                                        Login With Google
                                    </button>
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
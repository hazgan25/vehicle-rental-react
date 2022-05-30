import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { userAction, logoutAction } from '../../redux/actions/auth'

import Swal from 'sweetalert2'

import emailImg from '../../assets/img/email.png'
import profileImgDefault from '../../assets/img/profile-default.png'

import storage from 'redux-persist/lib/storage'

const Header = () => {
    const state = useSelector(state => state)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showImg, setShowImg] = useState(profileImgDefault)

    const { auth } = state
    const { token, userData } = auth
    const { image } = userData

    useEffect(() => {
        if (token) {
            dispatch(userAction(token))
                .then((res) => {
                    if (res) {
                        if (image !== null) {
                            setShowImg(`${process.env.REACT_APP_HOST}/${image}`)
                        }
                    }
                })
                .catch(({ ...err }) => {
                    if (token && err) {
                        storage.removeItem('persist:root')
                        window.location.reload(false)
                    }
                })
        }
    }, [dispatch, token, image])

    const logoutHandler = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: true
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure you want to log out ?',
            text: "You can log back in at any time!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Logout',
            cancelButtonText: 'No, Cancel!',
            reverseButtons: false
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Logout!',
                    'Logout Successful',
                    'success'
                )
                setTimeout(() => {
                    dispatch(logoutAction(token))
                    localStorage.clear('persist:root')
                    navigate('/')
                }, 2500)
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Congratulations on continuing your exploration of rental vehicles :)',
                    'info',
                )
            }
        })
    }

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-white">
            <nav className={`container ${styles['nav-pad']}`}>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <section className={styles['donut-up']}>
                    <span className={styles['circle-black']}></span>
                    <span className={styles['circle-yellow']}></span>
                </section>

                <section className="collapse navbar-collapse" id="navbarNav">
                    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                        <li className={`nav-item ${styles['nav-item']}`}>
                            <NavLink to={'/home'} className={`nav-link ${styles['nav-link']}`}>
                                <p>Home</p>
                            </NavLink>
                        </li>

                        <li className={`nav-item ${styles['nav-item']}`}>
                            <NavLink to={'/vehicle/type'} className={`nav-link ${styles['nav-link']}`}>
                                <p>Vehicle Type</p>
                            </NavLink>
                        </li>

                        <li className={`nav-item ${styles['nav-item']}`}>
                            <NavLink to={'/history?search=&by=id&order=desc'} className={`nav-link ${styles['nav-link']}`}>
                                <p>History</p>
                            </NavLink>
                        </li>

                        <li className={`nav-item ${styles['nav-item']}`}>
                            <NavLink to={'/about'} className={`nav-link ${styles['nav-link']}`}>
                                <p>About</p>
                            </NavLink>
                        </li>

                        {!token ? (
                            <React.Fragment>
                                <li>
                                    <Link to={'/login'}>
                                        <button className={styles['btn-login']}>Login</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/register'}>
                                        <button className={styles['btn-register']}>Register</button>
                                    </Link>
                                </li>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <li>
                                    <Link to={'/'}>
                                        <img src={emailImg} alt='avatar' className={styles['email-logo']} />
                                    </Link>
                                </li>

                                <li className={`dropdown ${styles['nav-item']}`}>
                                    <div id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={showImg} alt="avatar" className={styles['user-profile-img']}
                                            onError={e => {
                                                e.onError = null
                                                setShowImg(profileImgDefault)
                                            }}
                                        />
                                    </div>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link to='/edit/profile' className="dropdown-item">Edit Profile</Link></li>
                                        {userData.role === 'owner' ? (
                                            <React.Fragment>
                                                <li><Link className='dropdown-item' to={'/vehicle%20product?search=&type=&location=&by=id&order=desc'}>Vehicles Product</Link></li>
                                                <li><Link className='dropdown-item' to={'/history%20renter?search=&filter=&by=id&order=desc'}>Historys Order</Link></li>
                                            </React.Fragment>
                                        ) : (<></>)}
                                        <li><Link to='/help' className="dropdown-item" >Help</Link></li>
                                        <li><Link to='' className="dropdown-item" onClick={logoutHandler} >Log out</Link></li>
                                    </ul>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </section>
            </nav>
        </header>
    )
}

export default Header
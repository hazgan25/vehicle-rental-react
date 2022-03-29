import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './header.scoped.css'

import { userAction, logoutAction } from '../../redux/actions/auth'

import Swal from 'sweetalert2'

import emailImg from '../../assets/img/email.png'
import profileImgDefault from '../../assets/img/profile-default.png'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const state = useSelector(state => state)

    const [showImg, setShowImg] = useState(profileImgDefault)

    const { auth } = state
    const { token, userData } = auth
    const { image } = userData

    useEffect(() => {
        if (token) {
            dispatch(userAction(token))
        }
        if (token && image !== null) {
            setShowImg(`${process.env.REACT_APP_HOST}/${image}`)
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
            cancelButtonText: 'No, cancel!',
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
                /* Read more about handling dismissals below */
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
            <nav className=" container nav-pad">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="donut-up">
                    <span className="circle-black"></span>
                    <span className="circle-yellow"></span>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                <p>Home</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/vehicle/type" className="nav-link">
                                <p>Vehicle Type</p>
                            </NavLink>
                        </li>
                        <li className="nav-item nunito">
                            <NavLink to="/" className="nav-link">
                                <p>History</p>
                            </NavLink>
                        </li>
                        <li className='nav-item nunito'>
                            <NavLink to='/' className='nav-link'>
                                <p>About</p>
                            </NavLink>
                        </li>
                        {!token ? (
                            <React.Fragment>
                                <li>
                                    <Link to='/login'>
                                        <button className="btn-login">Login</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/register'>
                                        <button className="btn-register">Register</button>
                                    </Link>
                                </li>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>

                                <li>
                                    <Link to='/'>
                                        <img src={emailImg} alt="avatar" className="email-logo" />
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <li className="nav-item dropdown">
                                        <Link to="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={showImg} alt="avatar" className="user-profile-img"
                                                onError={e => {
                                                    e.onError = null
                                                    setShowImg(profileImgDefault)
                                                }}
                                            />
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><Link to='' className="dropdown-item">Edit Profile</Link></li>
                                            <li><Link to='' className="dropdown-item" >Help</Link></li>
                                            <li><Link to='' className="dropdown-item" onClick={logoutHandler} >Log out</Link></li>
                                        </ul>
                                    </li>
                                </li>


                                {/* <li>
                                    <Link to='/'>
                                        <img src={emailImg} alt="avatar" className="email-logo" />
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <div to="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={profileImgDefault} alt='avatar' className='user-profile-img'
                                        //  onError={(e) => {
                                        //     e.onError = null
                                        //     setShowImg(profileImgDefault)
                                        // }}
                                        />
                                    </div>
                                    <li className="nav-item dropdown">
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><Link to='/profile' className="dropdown-item">Edit Profile</Link></li>
                                            <li><Link to='/help' className="dropdown-item" >Help</Link></li>
                                            <li><Link to='' className="dropdown-item" onClick={logoutHandler} >Log out</Link></li>
                                        </ul>
                                    </li>
                                </li> */}

                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header
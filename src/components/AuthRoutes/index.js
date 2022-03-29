import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const userAuth = () => {
    const rootPersist = JSON.parse(localStorage.getItem('persist:root'))
    const authParse = JSON.parse(rootPersist.auth)

    const { token } = authParse
    let isLogin = true

    if (token) isLogin = false
    return isLogin
}


const AuthRoutes = () => {
    const isAuth = userAuth()
    return isAuth ? <Outlet /> : <Navigate to='/' replace={true} />
}

export default AuthRoutes
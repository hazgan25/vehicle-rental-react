import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const userAuth = () => {
    const rootPersist = JSON.parse(localStorage.getItem('persist:root'))
    const authParse = JSON.parse(rootPersist.auth)

    const { token } = authParse
    let isLogin = true
    if (!token || token === null) isLogin = false
    return isLogin
}

const PrivateRoutes = () => {
    const isAuth = userAuth()
    return isAuth ? <Outlet /> : <Navigate to='/' replace={true} />
}

export default PrivateRoutes
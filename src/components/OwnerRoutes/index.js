import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const userRoles = () => {
    const rootPersist = JSON.parse(localStorage.getItem('persist:root'))
    const authParse = JSON.parse(rootPersist.auth)

    let isOwner = true
    const { userData } = authParse
    const { role } = userData

    if (role !== 'owner') isOwner = false
    return isOwner
}

const OwnerRouter = () => {
    const isCheckOwner = userRoles()
    return isCheckOwner ? <Outlet /> : <Navigate to='/' replace={true} />
}

export default OwnerRouter
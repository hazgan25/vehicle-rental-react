import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store, pStore } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import NotFound from './pages/NotFound'

import VertificationAccount from './pages/VertificationAccount'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VehicleType from './pages/VehicleType'
import VehicleDetail from './pages/VehicleDetail'
import AddVehicle from './pages/AddVehicle'

// private route
import AuthRoutes from './components/AuthRoutes'
import PrivateRoutes from './components/PrivateRoutes'
import OwnerRoutes from './components/OwnerRoutes'

const main = () => {

    return (
        <Provider store={store}>
            <PersistGate persistor={pStore}>
                <BrowserRouter>
                    <Routes>

                        {/* public All */}
                        <Route path='/' element={<Navigate to='home' />} />
                        <Route path='home' element={<Home />} />
                        <Route path='vehicle/type' element={<VehicleType />} />
                        <Route path='vehicle/detail/:id' element={<VehicleDetail />} />

                        {/* route Auth */}
                        <Route element={<AuthRoutes />}>
                            <Route path='login' element={<Login />} />
                            <Route path='register' element={<Register />} />
                            <Route path='auth/verify/:pin' element={<VertificationAccount />} />
                        </Route>

                        {/* private owner */}
                        <Route element={<PrivateRoutes />}>
                            <Route element={<OwnerRoutes />}>
                                <Route path='vehicle/add' element={<AddVehicle />} />
                            </Route>
                        </Route>

                        <Route path='*' element={<NotFound />} />

                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider >
    )
}

export default main
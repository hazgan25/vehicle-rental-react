import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store, pStore } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VehicleType from './pages/VehicleType'
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

                        {/* route Auth */}
                        <Route element={<AuthRoutes />}>
                            <Route path='login' element={<Login />} />
                            <Route path='register' element={<Register />} />
                        </Route>

                        {/* private owner */}
                        <Route element={<PrivateRoutes />}>
                            <Route element={<OwnerRoutes />}>
                                <Route path='vehicle/add' element={<AddVehicle />} />
                            </Route>
                        </Route>

                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider >
    )
}

export default main
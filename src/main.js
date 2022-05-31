import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store, pStore } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import NotFound from './pages/NotFound'
import About from './pages/About'

import VertificationAccount from './pages/VertificationAccount'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import EditProfile from './pages/EditProfile'
import VehicleType from './pages/VehicleType'
import VehicleDetail from './pages/VehicleDetail'
import Reservation from './pages/Reservation'
import Payment from './pages/Payment'
import AddVehicle from './pages/AddVehicle'
import ViewMore from './pages/ViewMore'
import History from './pages/History'
import VehicleProduct from './pages/VehicleProduct'
import HistoryOrderRenter from './pages/HistoryOrderRenter'

// private route
import AuthRoutes from './components/AuthRoutes'
import PrivateRoutes from './components/PrivateRoutes'
import OwnerRoutes from './components/OwnerRoutes'
import ErrorServer from './pages/ErrorServer'

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
                        <Route path='view-more' element={<ViewMore />} />
                        <Route path='vehicle/detail/:id' element={<VehicleDetail />} />
                        <Route path='history' element={<History />} />
                        <Route path='about' element={<About />} />
                        <Route path='error%20server' element={<ErrorServer />} />

                        {/* route Auth */}
                        <Route element={<AuthRoutes />}>
                            <Route path='login' element={<Login />} />
                            <Route path='register' element={<Register />} />
                            <Route path='auth/verify/:pin' element={<VertificationAccount />} />
                            <Route path='forgot/password' element={<ForgotPassword />} />
                        </Route>

                        {/* Private Router */}
                        <Route element={<PrivateRoutes />}>
                            <Route path='edit/profile' element={<EditProfile />} />
                            <Route path={`reservation/vehicle=:id&quantity=:quantity`} element={<Reservation />} />
                            <Route path={`payment/vehicle=:id&quantity=:quantity&day=:day&price%20perday=:priceDay&totalPrice=:total`} element={<Payment />} />
                        </Route>

                        {/* private owner */}
                        <Route element={<PrivateRoutes />}>
                            <Route element={<OwnerRoutes />}>
                                <Route path='vehicle/add' element={<AddVehicle />} />
                                <Route path='vehicle%20product' element={<VehicleProduct />} />
                                <Route path='history%20renter' element={<HistoryOrderRenter />} />
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
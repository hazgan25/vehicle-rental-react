import React, { useState, useEffect } from 'react'
import Main from '../../components/Main'
import styles from './index.module.scss'

import vehicleNotFound from '../../assets/img/vehiclenotfound.png'
import CardVehicle from '../../components/CardVehicles'
import vehicleImgDefault from '../../assets/img/vehicle-default.png'

import { useSelector, useDispatch } from 'react-redux'

const History = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const { auth } = state
    const { token } = auth

    return (
        <Main>
            <main className={`container ${styles['top-history']}`}>
                {token ? (
                    <React.Fragment>

                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <section style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <img alt='avatar' src={vehicleNotFound} className={styles['vehicle-notFound']} />
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                            </div>
                        </section>
                        <section
                            style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                            <h5>Data history not found! please login first</h5>
                        </section>
                    </React.Fragment>
                )}
            </main>
        </Main>
    )
}

export default History
import React, { useEffect } from 'react'
import styles from './index.module.scss'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { listVehiclePopularAction } from '../../redux/actions/listVehicles'
import { paramsPopulerVehicle } from '../../modules/helper/listVehicle'

const ErrorServer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listVehiclePopularAction(paramsPopulerVehicle))
            .then((res) => {
                if (res) {
                    navigate('/')
                }
            })
    }, [dispatch, navigate])
    return (
        <main className={styles['error-server']}>
            <div className={`container-fluid ${styles['transparan-bg']}`}>
                <div className='container'>
                    <div className={styles['err-page']}>
                        <h1 className={styles['font-err-page']}>500</h1>
                        <h3 className={styles['error-server-text']}>looks like the server has an error</h3>
                        <a href='https://en.wikipedia.org/?title=500_error&redirect=no'>
                            <button className={styles['btn-see']}>See About Error</button>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ErrorServer
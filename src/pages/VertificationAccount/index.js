import React, { useEffect } from 'react'
import styles from './index.module.scss'

import { useParams, useNavigate, Link } from 'react-router-dom'

import { verify } from '../../modules/utils/auth'

import Swal from 'sweetalert2'

const VertificationAccount = () => {
    const navigate = useNavigate()

    const params = useParams()

    useEffect(() => {
        verify(params)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success Vertification',
                    text: `your account has been successfully verified, please login again on the web or mobile application`
                })
            })
            .catch(() => {
                navigate('/')
            })
    }, [params, navigate])

    return (
        <React.Fragment>
            <main className={styles['vertification-bg']}>
                <article className={`container-fluid ${styles['transparan-bg']}`}>
                    <h1 className={styles['success-vertify']}>
                        your account has been successfully verified, please login again on the web or mobile application
                    </h1>
                    <div
                        style={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            top: 63
                        }}>
                        <Link to={'/login'}>
                            <button className={styles['btn-to-home']}>Go Login</button>
                        </Link>
                    </div>
                </article>
            </main>
        </React.Fragment>
    )
}

export default VertificationAccount
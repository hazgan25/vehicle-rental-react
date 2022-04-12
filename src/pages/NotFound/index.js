import React from 'react'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'

const NotFound = () => {

    return (
        <React.Fragment>
            <main className={styles['not-found']}>
                <div className={`container-fluid ${styles['transparan-bg']}`}>
                    <div className='container'>
                        <div className={styles['err-page']}>
                            <h1 className={styles['font-err-page']}>404</h1>
                            <h3 className={styles['page-not-found']}>Page Not Found</h3>
                            <Link to={'/'}>
                                <button className={styles['btn-to-home']}>Back to Home</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default NotFound
import React from 'react'
import './NotFound.scoped.scss'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <React.Fragment>
            <main className="not-found">
                <div className='transparan-bg container-fluid'>
                    <div className="container">
                        <div className="err-page">
                            <h1 className="font-err-page">404</h1>
                            <h3 className="page-not-found">Page Not Found</h3>
                            <Link to='/'>
                                <button className="btn-to-home">Back to Home</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default NotFound
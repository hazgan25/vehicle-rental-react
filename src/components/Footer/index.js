import React from 'react'
import styles from './index.module.css'

import twitter from '../../assets/svg/twitter-logo.svg'
import facebook from '../../assets/svg/facebook-logo.svg'
import instagram from '../../assets/svg/instagram-logo.svg'
import linkedIn from '../../assets/svg/linkedIn-logo.svg'
import youtube from '../../assets/svg/youtube-logo.svg'

const Footer = () => {

    return (
        <footer className={`container-fluid ${styles['bg-footer']} ${styles['space-top-footer']}`}>
            <section className="container">
                <div className="row">
                    <div className="col-sm">
                        <div className={styles['donut-down']}>
                            <span className={styles['circle-black']}></span>
                            <span className={styles['circle-yellow']}></span>
                        </div>
                        <p className={styles['plan']}>
                            Plan and book your perfect trip with
                            expert advice, travel tips for vehicle
                            information from us
                        </p>
                        <p className={styles['copyright']}>
                            ©2020 Vehicle Rental Center. All rights reserved
                        </p>
                    </div>
                    <div className="col-sm">
                        <h5 className={styles['directory-list']}>Destinations</h5>
                        <ul className={styles['item-list']}>
                            <li key="Bali">Bali</li>
                            <li key='Yogyakarta'>Yogyakarta</li>
                            <li key='Jakarta'>Jakarta</li>
                            <li key='Kalimantan'>Kalimantan</li>
                            <li key='Malang'>Malang</li>
                        </ul>
                    </div>
                    <div className="col-sm">
                        <h5 className={styles['directory-list']}>Vehicle</h5>
                        <ul className={styles['item-list']}>
                            <li key='Bike'>Bike</li>
                            <li key='Cars'>Cars</li>
                            <li key='Motorbike'>Motorbike</li>
                            <li key='Return'>Return Times</li>
                            <li key='FAQ'>FAQs</li>
                        </ul>
                    </div>
                    <div className="col-sm">
                        <h5 className={styles['directory-list']}>Interest</h5>
                        <ul className={styles['item-list']}>
                            <li key='Adventure'>Adventure Travel</li>
                            <li key='Art'>Art and Culture</li>
                            <li key='Nature'>Wildlife and Nature</li>
                            <li key='Family'>Family Holiday</li>
                            <li key='Culinar'>Culinary Trip</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={styles['bg-icon-footer']}>
                <div className={`row ${styles['items-justify']}`}>
                    <div className="col-1">
                        <a href="https://twitter.com">
                            <img src={twitter} alt="twitter" className={styles['logo']} />
                        </a>
                    </div>
                    <div className="col-1">
                        <a href="https://facebook.com">
                            <img src={facebook} alt="facebook" className={styles['logo']} />
                        </a>
                    </div>
                    <div className="col-1">
                        <a href="https://instagram.com">
                            <img src={instagram} alt="instagram" className={styles['logo']} />
                        </a>
                    </div>
                    <div className="col-1">
                        <a href="https://linkedin.com">
                            <img src={linkedIn} alt="linkedin" className={styles['logo']} />
                        </a>
                    </div>
                    <div className="col-1">
                        <a href="https://youtube.com">
                            <img src={youtube} alt="youtube" className={styles['logo']} />
                        </a>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer
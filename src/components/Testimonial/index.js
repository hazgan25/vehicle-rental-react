import React, { useState, useEffect } from 'react'
import styles from './index.module.css'

import { listTestimonialHome } from '../../modules/utils/testimonial'

import profileImgDefault from '../../assets/img/profile-default.png'
import arrow from '../../assets/svg/arrow.svg'
import plusHome from '../../assets/svg/plusHome.svg'

const Testimonial = () => {
    const [dataTesti, setDataTesti] = useState({})
    const [ratingTesti, setRatingTesti] = useState([])
    const [imgTesti, setImgTesti] = useState('')
    const [nameTesti, setNameTesti] = useState('')
    const [testimonyTesti, setTestiMonyTesti] = useState('')
    const [meta, setMeta] = useState({})

    const { next, page, prev } = meta
    let ratingArr = []
    for (let i = 0; i < ratingTesti; i++) {
        ratingArr.push(i)
    }

    useEffect(() => {
        const params = {
            limit: 1,
            page: 1
        }
        listTestimonialHome(params)
            .then((res) => {
                setDataTesti(res.data.result.result[0])
                setMeta(res.data.result.meta)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (dataTesti !== undefined) {
            const { rating, image, name, testimony } = dataTesti
            setRatingTesti(rating)
            setImgTesti(image)
            setNameTesti(name)
            setTestiMonyTesti(testimony)
        }
    }, [dataTesti, ratingTesti])

    const nextTestiHandler = () => {
        if (next !== null) {
            const newPArams = {
                limit: 1,
                page: page + 1
            }
            listTestimonialHome(newPArams)
                .then((res) => {
                    setDataTesti(res.data.result.result[0])
                    setMeta(res.data.result.meta)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const prevTestiHandler = () => {
        if (prev !== null) {
            const newPArams = {
                limit: 1,
                page: page - 1
            }
            listTestimonialHome(newPArams)
                .then((res) => {
                    setDataTesti(res.data.result.result[0])
                    setMeta(res.data.result.meta)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <React.Fragment>
            <div className={styles['ring-gradient-list']}>
                <span className={styles['circle-gradient-list']}></span>
                <span className={styles['circle-white-list']}></span>
            </div>
            <article className={`container ${styles['review-testimony']}`}>
                <h3 className={styles['testimony']}>Testimonials</h3>

                {dataTesti !== undefined || dataTesti === [] ? (
                    <React.Fragment>
                        <main className='row'>
                            <section className='col-sm'>
                                <div className={styles['ratings']}>
                                    {ratingArr.map((data) => (
                                        <React.Fragment key={data}>
                                            <i className={`fa fa-star ${styles['rating-color']}`}></i>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <p className={styles['review-comment']}>{testimonyTesti}</p>
                                <h3 className={styles['testimony-name']}>{nameTesti !== null ? nameTesti : 'users'}</h3>
                            </section>

                            <section className='col-sm'>
                                <div className={styles['ring-gradient-profile']}>
                                    <span className={styles['circle-gradient-profile']}></span>
                                    <span className={styles['circle-white-profile']}></span>

                                    <div>
                                        <div style={{ backgroundImage: `url(${profileImgDefault})` }} className={styles['testimony-img-default']}>
                                            <div className={styles['profile-block']}>
                                                <div className={styles['arrow-left']}>
                                                    <span className={styles['circle-arrow']}></span>
                                                    <span className={styles['arrow-up']}></span>
                                                    <span className={styles['arrow-down']}></span>
                                                </div>
                                                <div className={styles['arrow-right']}>
                                                    <span className={styles['circle-arrow']}></span>
                                                    <span className={styles['arrow-up']}></span>
                                                    <span className={styles['arrow-down']}></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ backgroundImage: `url(${process.env.REACT_APP_HOST}/${imgTesti})` }} className={styles['testimony-img']}>
                                            <div className={styles['profile-block']}>
                                                <div className={styles['arrow-left']}>
                                                    <span className={styles['circle-arrow']} onClick={prevTestiHandler}>
                                                        <img src={arrow} alt='avatar' style={{
                                                            position: 'absolute',
                                                            top: 6,
                                                            left: 8,
                                                        }} />
                                                    </span>
                                                </div>
                                                <div className={styles['arrow-right']}>
                                                    <div className={styles['circle-arrow']} onClick={nextTestiHandler}>
                                                        <img src={arrow} alt='avatar' style={{
                                                            position: 'absolute',
                                                            top: 6,
                                                            left: 8,
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <img src={plusHome} alt='avatar' style={{ position: 'absolute', bottom: -10, left: -5 }} />
                                    </div>

                                </div>
                            </section>
                        </main>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <h3 style={{
                            position: 'relative',
                            textAlign: 'center',
                            marginTop: 83
                        }}>Coming Soon</h3>
                    </React.Fragment>
                )}
            </article>
        </React.Fragment>
    )
}

export default Testimonial
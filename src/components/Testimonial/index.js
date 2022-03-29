import React, { useState, useEffect } from 'react'
import './testimonial.scoped.css'

import { listTestimonialHome } from '../../modules/utils/testimonial'

import profileImgDefault from '../../assets/img/profile-default.png'
import arrow from '../../assets/svg/arrow.svg'
import plusHome from '../../assets/svg/plusHome.svg'

const Testimonial = () => {
    const [dataTesti, setDataTesti] = useState({})
    const [meta, setMeta] = useState({})

    const { rating, image, name, testimony } = dataTesti
    const { next, page, prev } = meta

    let ratingArr = []

    for (let i = 0; i < rating; i++) {
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
            <div className='ring-gradient-list'>
                <span className='circle-gradient-list'></span>
                <span className='circle-white-list'></span>
            </div>
            <article className='container rivew-testimony'>
                <h3 className='testimony'>Testimonials</h3>
                <main className='row'>
                    <section className='col-sm'>
                        <div className='ratings'>
                            {ratingArr.map((data) => (
                                <React.Fragment key={data}>
                                    <i className="fa fa-star rating-color"></i>
                                </React.Fragment>
                            ))}
                        </div>
                        <p className='review-comment'>{testimony}</p>
                        <h3 className='testimony-name'>{name !== null ? name : 'users'}</h3>
                    </section>

                    <section className='col-sm'>
                        <div className='ring-gradient-profile'>
                            <span className='circle-gradient-profile'></span>
                            <span className='circle-white-profile'></span>
                            <div>
                                <div style={{ backgroundImage: `url(${profileImgDefault})` }} className='testimony-img-default'>
                                    <div className='profile-block'>
                                        <div className='arrow-left'>
                                            <span className='circle-arrow'></span>
                                            <span className='arrow-up'></span>
                                            <span className='arrow-down'></span>
                                        </div>
                                        <div className='arrow-right'>
                                            <span className='circle-arrow'></span>
                                            <span className='arrow-up'></span>
                                            <span className='arrow-down'></span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ backgroundImage: `url(${process.env.REACT_APP_HOST}/${image})` }} className='testimony-img'>
                                    <div className='profile-block'>
                                        <div className='arrow-left'>
                                            <span className='circle-arrow' onClick={prevTestiHandler}>
                                                <img src={arrow} alt='avatar' style={{
                                                    position: 'absolute',
                                                    top: 6,
                                                    left: 8,
                                                }} />
                                            </span>
                                        </div>
                                        <div className='arrow-right bg-danger'>
                                            <div className='circle-arrow' onClick={nextTestiHandler}>
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
            </article>
        </React.Fragment>
    )
}

export default Testimonial
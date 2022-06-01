import React from 'react'
import styles from './index.module.scss'
import arrowBack from '../../assets/svg/arrowBack.svg'

import vehicleImgDefault from '../../assets/img/vehicle-default.png'

const host = process.env.REACT_APP_HOST

const carouselInner = (image, idx) => {
    let showImg = `${host}/${image.images}`
    if (showImg === 'default') showImg = require('../../assets/img/vehicle-default.png')
    return (
        <div
            className={`carousel-item ${styles['carousel-item-vehicle']} ${idx === 0 && 'active'}`}
            data-bs-interval='false'
            key={idx}>
            <img
                src={showImg}
                className='d-block w-100'
                alt='...'
                onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = vehicleImgDefault
                }}
            />
            <div className='carousel-caption d-none d-md-block'></div>
        </div>
    )
}

const carouselIndicators = (image, idx) => {
    let showImg = `${host}/${image.images}`
    if (showImg === 'default') showImg = require('../../assets/img/vehicle-default.png')

    return (
        <div className={styles['img-preview-wrapper']} key={idx}>
            <img
                data-bs-target='#carouselExampleDark'
                data-bs-slide-to={idx}
                className='active'
                aria-current='true'
                aria-label={`Slide ${idx}`}
                src={showImg}
                width='100%'
                alt=''
                onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = vehicleImgDefault
                }}
            />
        </div>
    )
}

const Carousel = (images) => {
    const imgArr = images.data
    return (
        <div
            id='carouselExampleDark'
            className='carousel carousel-dark slide'
            data-bs-ride='carousel'
            data-bs-interval='false'>

            <div className='carousel-inner'>
                {
                    Array.isArray(imgArr) && imgArr.length > 0 ?
                        imgArr.map((image, idx) => {
                            return carouselInner(image, idx);
                        })
                        : carouselInner('default', 0)
                }
            </div>

            <div className={`row d-none d-sm-flex ${styles['preview-images']}`}>
                <div className={`col-2 ${styles['align-items-center']}`}>
                    <button
                        href='#prev'
                        aria-label='Previous Image'
                        className={`${styles['btn']} carousel-control-prev`}
                        type='button'
                        data-bs-target='#carouselExampleDark'
                        data-bs-slide='prev'>
                        <img src={arrowBack} width='30' height='40' alt='' />
                    </button>
                </div>

                <div className='col-8'>
                    <div className={`carousel-indicators ${styles['carousel-indicators']}`}>
                        {
                            Array.isArray(imgArr) && imgArr.length > 0 ?
                                imgArr.map((image, idx) => {
                                    return carouselIndicators(image, idx);
                                })
                                : carouselIndicators('default', 0)
                        }
                    </div>
                </div>

                <div className={`col-2 ${styles['right-arrow']} ${styles['align-items-center']}`}>
                    <button
                        aria-label='Next Image'
                        className='carousel-control-next'
                        type='button'
                        data-bs-target='#carouselExampleDark'
                        data-bs-slide='next'>
                        <img src={arrowBack} width='30' height='40' alt='' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Carousel
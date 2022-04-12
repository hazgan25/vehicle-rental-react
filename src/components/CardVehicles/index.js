import React from 'react'
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'

import vehicleImgDefault from '../../assets/img/vehicle-default.png'

const CardVehicle = ({ name, id, image }) => {
    const navigate = useNavigate()
    return (
        <main>
            <section style={{ backgroundImage: `url(${vehicleImgDefault})` }} className={styles['img-vehicle-default']}
                onClick={() => { navigate(`/vehicle/detail/${id}`) }}>
                <div className={styles['text-block']}>
                    <p className={`${styles['location-name']} ${styles['opacity']}`}>
                        {name}
                    </p>
                </div>
            </section>

            <section style={
                { backgroundImage: `url(${process.env.REACT_APP_HOST}/${image})` }
            } className={styles['img-vehicle']}
                onClick={() => { navigate(`/vehicle/detail/${id}`) }}>
                <div className={styles['text-block']}>
                    <p className={`${styles['location-name']} ${styles['opacity']}`}>
                        {name}
                    </p>
                </div>
            </section>
        </main>
    )
}

export default CardVehicle
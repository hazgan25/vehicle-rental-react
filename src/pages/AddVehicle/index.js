import React from 'react'
import './addVehicle.scoped.css'

import Main from '../../components/Main'

import arrowBack from '../../assets/svg/arrowBack.svg'
import { Link } from 'react-router-dom'

const AddVehicle = () => {

    return (
        <Main>
            <main className='container mt-3'>
                <section className='backHome justify-content-between'>
                    <Link to='/'>
                        <img src={arrowBack} alt='avatar' className='backArrow' />
                    </Link>
                    <h3 className='addNewItem'>Add new item</h3>
                </section>

                <section>

                </section>
            </main>
        </Main>
    )
}

export default AddVehicle
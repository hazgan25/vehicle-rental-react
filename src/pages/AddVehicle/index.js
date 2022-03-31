import React, { useState, createRef } from 'react'
import './AddVehicle.scoped.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Main from '../../components/Main'
// import cameraIcon from '../../assets/svg/cameraIcon.svg'
import addImgDefault from '../../assets/img/addImgDefault.jpg'

import arrowBack from '../../assets/svg/arrowBack.svg'

const AddVehicle = () => {
    const state = useSelector(state => state)
    const { token } = state.auth

    const [name, setName] = useState('')
    const [selectLocation, setSelectLocation] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [selectType, setSelectType] = useState('')
    const [stock, setStock] = useState(1)

    const inputImgOne = createRef()
    const inputImgTwo = createRef()
    const inputImgThree = createRef()

    const [imgFile1, setImgFile1] = useState('')
    const [imgFile2, setImgFile2] = useState('')
    const [imgFile3, setImgFile3] = useState('')

    const [showImg1, setShowImg1] = useState(addImgDefault)
    const [showImg2, setShowImg2] = useState(addImgDefault)
    const [showImg3, setShowImg3] = useState(addImgDefault)

    const [selectImg1, setSelectImg1] = useState(null)
    const [selectImg2, setSelectImg2] = useState(null)
    const [selectImg3, setSelectImg3] = useState(null)

    const [stateImg, setStateImg] = useState({})

    const body = new FormData()
    body.append('name', name)
    body.append('locations_id', selectLocation)
    body.append('types_id', selectType)
    body.append('description', desc)
    body.append('price', price)
    body.append('stock', stock)

    const btnMin = () => {
        if (stock > 1) {
            setStock(stock - 1)
        }
    }

    const btnPlus = () => {
        setStock(stock + 1)
    }

    const handleFileChange1 = (e) => {
        setSelectImg1(e.target.files[0])
    }
    const inputImg1 = (e) => {
        inputImgOne.current.click()
    }

    const handleFIleChange2 = (e) => {
        setSelectImg2(e.target.files[0])
    }
    const inputImg2 = (e) => {
        inputImgTwo.current.click()
    }

    const handleFIleChange3 = (e) => {
        getBase64(e, 'images')
        setSelectImg3(e.target.files[0])
    }
    const inputImg3 = (e) => {
        getBase64(e, 'images')
        inputImgThree.current.click()
    }

    const getBase64 = (e, stateImg) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setStateImg({ stateImg: reader.result })
        }
        reader.onerror = (err) => {
            console.log('error base', err)
        }
    }

    for (var pair of body.entries()) {
        console.log(pair[0] + ', ' + pair[1])
    }

    const handleSaveItem = (e) => {
        if (selectImg1 !== null) {
            e.preventDefault()
            body.append('images', selectImg1)
        }
        if (selectImg2 !== null) {
            e.preventDefault()
            body.append('images', selectImg2)
        }
        if (selectImg3 !== null) {
            e.preventDefault()
            body.append('images', selectImg3)
        }
    }


    return (
        <Main>
            <main className='container mt-3'>
                <section className='backHome justify-content-between'>
                    <Link to='/'>
                        <img src={arrowBack} alt='avatar' className='backArrow' />
                    </Link>
                    <h3 className='addNewItem'>Add new item</h3>
                </section>

                <form className='container' onSubmit={handleSaveItem}>
                    <form onSubmit={handleSaveItem}>
                        <section className='flex-main container'>
                            <img src={showImg1} className='addImg1' />
                            <div className='input-forms-add-item'>
                                <input type='text' className='input-add-item' placeholder='Name (max up to 50 words)' />
                                <input type='text' className='input-add-item' placeholder='Location' />
                                <input type='text' className='input-add-item' placeholder='Description (max up to 150 words)' />
                                <input type='text' className='input-add-item' placeholder='' />
                                <p>Price :</p>
                                <input />
                            </div>
                        </section>
                    </form>
                </form>

            </main>
        </Main>
    )
}

export default AddVehicle
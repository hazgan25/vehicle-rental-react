import React from 'react'
import './Vertification.scoped.scss'

import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { verify } from '../../modules/utils/auth'
import Swal from 'sweetalert2'

const VerificationAccoun = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { pin } = params

    useEffect(() => {
        const newParams = {
            pin: pin
        }
        verify(newParams)
            .then((res) => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'Success Vertification'
                })
            })
            .catch(() => {
                navigate('/')
            })
    }, [pin, navigate])
    return (
        <React.Fragment>
            <main className='vertification-bg'>
                <div className='transparan-bg container-fluid'>

                    <h1 className='success-vertify'>your account has been successfully verified, please login again on the web or mobile application</h1>
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        top: 63
                    }}>
                        <Link to='/login'>
                            <button className="btn-to-home">Go Login</button>
                        </Link>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default VerificationAccoun
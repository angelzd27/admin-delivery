import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'
import { TextField } from '@mui/material'

import EmailAnimation from '../assets/animations/Email.mp4'

function ForgotPassword() {
    const [emailValue, setEmailvalue] = useState('')

    const inputChange = (event) => {
        setEmailvalue(event.target.value)
    }

    return (
        <>
            <div className='bg-yummy-800 flex w-full h-screen'>

                {/* Contenedor del formulario */}
                <div className=' w-full flex items-center justify-center lg:w-1/2'>
                    <div className='bg-white px-10 py-8 rounded-3xl border-2 border-gray-100'>
                        <h1 className='text-4xl font-semibold text-center'>Forgot your password?</h1>
                        <p className='font-medium text-lg text-gray-500 mt-4'>We need to check if your email exists or is still active</p>

                        <div className='mt-8'>
                            <div className='relative'>
                                <TextField label='Email' variant='standard' type='email' className='w-full' value={emailValue} onChange={inputChange} />
                                <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                                    <MdEmail />
                                </div>
                            </div>
                            <div className='mt-8 flex flex-row justify-between gap-y-4'>
                                <Link to='/auth' className='text-yummy-800 hover:text-yummy-600 transition-colors duration-200'>
                                    Return
                                </Link>
                                <Link to='/auth/email_code' className={`text-yummy-800 hover:text-yummy-600 transition-all duration-200 ${emailValue.length < 0 ? 'underline underline-offset-4' : ''}`}>
                                    Check & Continue
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenedor de la animacion */}
                <div className='hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white' >
                    <video autoPlay loop muted>
                        <source src={EmailAnimation} type='video/mp4' />
                    </video>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
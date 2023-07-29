import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { TextField } from '@mui/material'

import SetPasswordAnimation from '../assets/animations/SetPassword.mp4'

function SetPassword() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <div className='bg-yummy-800 flex w-full h-screen'>

                {/* Contenedor del formulario */}
                <div className=' w-full flex items-center justify-center lg:w-1/2'>
                    <div className='bg-white px-10 py-8 rounded-3xl border-2 border-gray-100'>
                        <p className='text-xl font-semibold text-gray-500 text-left mb-1'>Set your new password and remember it</p>
                        <span className='text-sm text-gray-500'>Note: The password must have a capital letter, number and special character for greater security</span>

                        <div className='mt-8'>
                            <div className='flex flex-col gap-8'>
                                <div className='flex flex-col gap-2'>
                                    <div className='relative'>
                                        <TextField label='New Password' variant='standard' type={showPassword ? 'text' : 'password'} className='w-full' />
                                        <button onClick={() => { setShowPassword(!showPassword) }} className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                                            {
                                                showPassword ? <IoMdEye /> : <IoMdEyeOff />
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='relative'>
                                        <TextField label='Repeat New Password' variant='standard' type={showPassword ? 'text' : 'password'} className='w-full' />
                                        <button onClick={() => { setShowPassword(!showPassword) }} className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                                            {
                                                showPassword ? <IoMdEye /> : <IoMdEyeOff />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-8 flex flex-row justify-between gap-y-4'>
                                <Link to='/auth/sign_in' className='text-yummy-800 hover:text-yummy-600 transition-colors duration-200'>
                                    Cancel
                                </Link>
                                <Link to='/auth/sign_in' className='text-yummy-800 hover:text-yummy-600 transition-colors duration-200'>
                                    Set New Password
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenedor de la animacion */}
                <div className='hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white' >
                    <video autoPlay loop muted>
                        <source src={SetPasswordAnimation} type='video/mp4' />
                    </video>
                </div>
            </div>
        </>
    )
}

export default SetPassword
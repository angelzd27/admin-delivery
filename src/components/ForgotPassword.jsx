import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'

import recovery_password from '../assets/images/RecoveryPassword.png'

function ForgotPassword() {
    return (
        <>
            <div className="bg-yummy-800 flex w-full h-screen">

                {/* Contenedor del formulario */}
                <div className=" w-full flex items-center justify-center lg:w-1/2">
                    <div className='bg-white px-10 py-8 rounded-3xl border-2 border-gray-100'>
                        <h1 className=' text-4xl font-semibold text-center'>Forgot your password?</h1>
                        <p className=" font-medium text-lg text-gray-500 mt-4">Sigue estos pasos y procura no salir de la ventana</p>

                        <div className='mt-8'>
                            <div className=''>
                                <label className="flex items-center gap-2 text-lg font-medium">
                                    <MdEmail />
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder='Enter your Email' />
                            </div>
                            <div className='mt-8 flex flex-row justify-between gap-y-4'>
                                <Link to='/auth' className='text-yummy-800 hover:text-yummy-600 transition-colors duration-200'>
                                    Return
                                </Link>
                                <Link to='/auth/email_code' className='text-yummy-800 hover:text-yummy-600 transition-colors duration-200'>
                                    Check & Continue
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenedor de la animacion */}
                <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white" >
                    <img src={recovery_password} alt="YumiLogo" className="w-fit animate-ping animate-infinite animate-duration-[1500ms] animate-ease-in animate-normal" />
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
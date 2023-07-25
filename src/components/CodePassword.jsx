import { useState } from 'react'
import { Link } from 'react-router-dom'
import CodeAnimation from '../assets/animations/Code.mp4'

function CodePassword() {

    return (
        <>
            <div className="bg-yummy-800 flex w-full h-screen">

                {/* Contenedor del formulario */}
                <div className=" w-full flex items-center justify-center lg:w-1/2">
                    <div className='bg-white px-10 py-8 rounded-3xl border-2 border-gray-100'>
                        <p className=" font-medium text-lg text-gray-500 mt-4">We send a code to your e-mail</p>

                        <div className="mt-8">
                            <div className='flex gap-x-4'>
                                <input type='text' className='border-2 border-gray-500 w-11 h-11 text-center rounded-md focus:outline-none focus:border-yummy-600 transition-colors' maxLength='1' />
                                <input type='text' className='border-2 border-gray-500 w-11 h-11 text-center rounded-md focus:outline-none focus:border-yummy-600 transition-colors' maxLength='1' />
                                <input type='text' className='border-2 border-gray-500 w-11 h-11 text-center rounded-md focus:outline-none focus:border-yummy-600 transition-colors' maxLength='1' />
                                <input type='text' className='border-2 border-gray-500 w-11 h-11 text-center rounded-md focus:outline-none focus:border-yummy-600 transition-colors' maxLength='1' />
                                <input type='text' className='border-2 border-gray-500 w-11 h-11 text-center rounded-md focus:outline-none focus:border-yummy-600 transition-colors' maxLength='1' />
                                <input type='text' className='border-2 border-gray-500 w-11 h-11 text-center rounded-md focus:outline-none focus:border-yummy-600 transition-colors' maxLength='1' />
                            </div>
                            <div className='mt-8 flex flex-row justify-end gap-y-4'>
                                <Link to='/auth/set_password' className='text-yummy-800 hover:text-yummy-600 transition-colors duration-200'>
                                    Verify Code
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenedor de la animacion */}
                <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white" >
                    <video autoPlay loop muted>
                        <source src={CodeAnimation} type='video/mp4' />
                    </video>
                </div>
            </div>
        </>
    )
}

export default CodePassword
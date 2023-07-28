import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'



function RegisterForm() {
    return (
        <>
        
        <div className="bg-yummy-800 flex w-full h-fit ">

        {/* Contenedor de la animación */}
        <div className="hidden relative lg:flex h-full w-1/3 items-center justify-center bg-white"> 
        </div>

        {/* Contenedor del formulario */}
            <div className="w-full lg:w-2/3">
                <div className="flex flex-col h-full">
                    <h2 className=' mt-5 text-white text-xl font-bold text-center mb-2'>Personal Information</h2>

                    <div className="ml-5 mr-5">
                    <label className="text-white block text-sm font-medium mb-2 w-90">First Name:</label>
                    <input
                        type="text"
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your First Name'
                    />
                    </div>

                    <div className="ml-5  mr-5 grid grid-cols-2 gap-2 mt-2">
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Last Name:</label>
                        <input
                        type="text"
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your Last Name'
                        />
                    </div>
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Second Last Name:</label>
                        <input
                        type="text"
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your Second Last Name'
                        />
                    </div>
                    </div>

                    <div className="ml-5  mr-5 grid grid-cols-3 gap-2 mt-2">
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Phone:</label>
                        <input
                        type="text"
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your Phone'
                        />
                    </div>
                    
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">ISO Code:</label>
                        <select
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        >
                        <option value="iso1">ISO 1</option>
                        <option value="iso2">ISO 2</option>
                        <option value="iso3">ISO 3</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">DIAL Code:</label>
                        <select
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        >
                        <option value="iso1">DIAL 1</option>
                        <option value="iso2">DIAL 2</option>
                        <option value="iso3">DIAL 3</option>
                        </select>
                    </div>
                    
                    </div>

                    <div className=" mr-5 ml-5 grid grid-cols-2 gap-2 mt-2">

                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Gender:</label>
                        <select
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        >
                        <option value="iso1">male</option>
                        <option value="iso2">female</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Profile:</label>
                        <select
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        >
                        <option value="iso1">admin</option>
                        <option value="iso2">user</option>
                        </select>
                    </div>
                    </div>

                    <h2 className='text-white text-x font-bold text-center mt-8'>Account Information</h2>

                    <div className='ml-5  mr-5'>
                        
                    <label className="text-white block text-sm font-medium mb-2">Username:</label>
                    <input
                        type="text"
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your username'
                    />
                    </div>

                    <div className='ml-5  mr-5'>
                    <label className="text-white block text-sm font-medium mb-2">Email:</label>
                    <input
                        type="text"
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your email'
                    />
                    </div>

                    <div className="ml-5  mr-5 grid grid-cols-2 gap-2 mt-2">
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Password:</label>
                        <input
                        type="password"
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your password'
                        />
                    </div>
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Confirm Password</label>
                        <input
                        type="password"
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        />

                        
                    </div>

                  

                    
                    </div>

                    <button className="mr-5 ml-5 bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl mt-4">Register</button>

                    


                    
                </div>       
                </div>
                </div>
             





        
           
        
        </>
    )
}

export default RegisterForm
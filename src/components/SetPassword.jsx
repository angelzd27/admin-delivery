import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { TextField } from '@mui/material'

function SetPassword() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <p className='font-medium text-lg text-gray-500 mt-8'>Set your new password in the fields below</p>
            <p className='font-medium text-sm text-gray-500'>Note: The password requiered a capital letter, number and special character</p>
            <div className='flex flex-col gap-8 mt-4'>
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
            <div className='mt-10 flex flex-row justify-between gap-y-4'>
                <Link to='/auth/sign_in' className='text-yummy-800 hover:text-yummy-600 transition-colors duration-200'>
                    Cancel
                </Link>
                <Link to='/auth/sign_in' className='text-yummy-800 hover:text-yummy-600 transition-colors duration-200'>
                    Set New Password
                </Link>
            </div>
        </>
    )
}

export default SetPassword
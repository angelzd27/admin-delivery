import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'

function CodePassword({ handleNext }) {

    return (
        <>
            <p className='font-medium text-lg text-gray-500 mt-8'>We have sent you a verification code to your email</p>
            <div className='flex gap-x-4 mt-8 items-center justify-center'>
                <TextField type='text' variant='standard' className='w-10' inputProps={{ maxLength: 1 }} />
                <TextField type='text' variant='standard' className='w-10' />
                <TextField type='text' variant='standard' className='w-10' />
                <TextField type='text' variant='standard' className='w-10' />
                <TextField type='text' variant='standard' className='w-10' />
                <TextField type='text' variant='standard' className='w-10' />
            </div>
            <div className='mt-8 flex flex-row justify-end gap-y-4'>
                <Link onClick={handleNext} className='text-yummy-800 hover:text-yummy-600 transition-colors duration-200'>
                    Verify Code
                </Link>
            </div>
        </>
    )
}

export default CodePassword
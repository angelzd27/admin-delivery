import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'

function EmailValidator({ handleNext }) {
    return (
        <>
            <p className='font-medium text-lg text-gray-500 mt-4'>Put your e-mail that you have registered</p>

            <div className='mt-4'>
                <div className='relative'>
                    <TextField label='Email' variant='standard' type='email' className='w-full' />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                        <MdEmail />
                    </div>
                </div>
                <div className='mt-8 flex flex-row justify-between gap-y-4'>
                    <Link to='/auth' className='text-yummy-800 hover:text-yummy-600 transition-colors duration-200'>
                        Cancel
                    </Link>
                    <Link onClick={handleNext} className='text-yummy-800 hover:text-yummy-600 transition-all duration-200'>
                        Check & Continue
                    </Link>
                </div>
            </div>
        </>
    )
}

export default EmailValidator
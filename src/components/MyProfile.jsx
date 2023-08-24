import { TextField } from '@mui/material'
import { MdSave, MdEmail, MdPassword } from 'react-icons/md'
import { useState } from 'react'
import ProfileImg from './ProfileImg'
import { decodedDataJWT } from '../services/jwt'
import { countries } from '../services/country_codes'

function MyProfile() {
    const [formData, setFormData] = useState({
        firstName: decodedDataJWT().first_name,
        lastName: decodedDataJWT().last_name,
        secondLastName: decodedDataJWT().second_last_name,
        phone: decodedDataJWT().phone,
        isoCode: decodedDataJWT().iso_code,
        dialCode: decodedDataJWT().dial_code,
        gender: decodedDataJWT().id_gender == 1 ? 'Male' : 'Female',
        profile: decodedDataJWT().type_user_id == 1 ? 'Admin' : decodedDataJWT().type_user_id == 2 ? 'Client' : 'Employee',
        username: decodedDataJWT().username,
        email: decodedDataJWT().email,
    })

    return (
        <>
            <div className='flex flex-col gap-6'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl'>Product Detail</h1>
                    <button className='flex items-center justify-center gap-1 text-sm bg-yummy-800 text-white px-3 py-2 rounded-full hover:bg-yummy-600 transition-all shadow-lg'>Update <MdSave /></button>
                </div>
                <ProfileImg image_url={decodedDataJWT().picture} />

                <div className='grid grid-cols-2 gap-6 pt-6 pb-6'>
                    <TextField
                        label='First Name'
                        value={formData.firstName}
                        variant='standard' />
                    <TextField
                        label='Last Name'
                        value={formData.lastName}
                        variant='standard' />
                    <TextField
                        label='Second Last Name (Optional)'
                        value={formData.secondLastName}
                        variant='standard' />
                    <TextField
                        label='Phone'
                        value={formData.phone}
                        variant='standard' />
                    <TextField
                        label='ISO Code'
                        value={formData.isoCode}
                        variant='standard' />
                    <TextField
                        label='Dial Code'
                        value={formData.dialCode}
                        variant='standard' />
                    <TextField
                        disabled
                        label='Gender'
                        value={formData.gender}
                        variant='standard' />
                    <TextField
                        disabled
                        label='Profile'
                        value={formData.profile}
                        variant='standard' />
                    <TextField
                        label='@Username'
                        value={formData.username}
                        variant='standard' />
                    <TextField
                        disabled
                        label='E-Mail'
                        value={formData.email}
                        variant='standard' />
                </div>
                <div className='flex flex-col gap-6 text-yummy-800 items-end'>
                    <span className='flex gap-2 items-center cursor-pointer hover:text-yummy-600 transition-colors'>Change My Password <MdPassword /></span>
                    <span className='flex gap-2 items-center cursor-pointer hover:text-yummy-600 transition-colors'>Change My E-Mail <MdEmail /></span>
                </div>
            </div>
        </>
    )
}

export default MyProfile
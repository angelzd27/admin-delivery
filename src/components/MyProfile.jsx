import { useState, useEffect } from 'react'
import { TextField, Alert, Dialog } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { MdSave, MdEmail, MdPassword, MdClose, MdSend } from 'react-icons/md'
import { BiArrowFromBottom } from 'react-icons/bi'
import axios from 'axios'
import { decodedDataJWT } from '../services/jwt'
import { countries } from '../services/country_codes'
import { gender } from '../services/gender'
import { profile } from '../services/profile'
import { BD_ACTION_POST, BD_ACTION_PUT } from '../services/master'
import { setJWT } from '../services/jwt'
import Loader from './Loader'

function MyProfile() {
    const [passwordDialog, setPasswordDialog] = useState(false)
    const [emailDialog, setEmailDialog] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [load, setLoad] = useState(false)
    const [resetPassword, setResetPassword] = useState({
        email: decodedDataJWT().email,
        password: '',
        repeat_password: ''
    })
    const [form, setForm] = useState({
        first_name: decodedDataJWT().first_name,
        last_name: decodedDataJWT().last_name,
        second_last_name: decodedDataJWT().second_last_name,
        phone: decodedDataJWT().phone,
        country: countries.find(country => country.code == decodedDataJWT().iso_code),
        id_gender: decodedDataJWT().id_gender,
        type_user_id: decodedDataJWT().type_user_id,
        username: decodedDataJWT().username,
        email: decodedDataJWT().email,
        picture: decodedDataJWT().picture
    })

    useEffect(() => {
        return () => { }
    }, [resetPassword])


    const upload_images = async (event) => {
        const preset_key = 'lplxq1y3'
        const cloud_name = 'du7kxnb4h'

        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset_key)
        const data = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        console.log(data)
        setForm({ ...form, picture: data.data.secure_url })
    }

    const put_user = async () => {
        setLoad(true)
        const body = {
            user_id: decodedDataJWT().id,
            first_name: form.first_name,
            last_name: form.last_name,
            second_last_name: form.second_last_name,
            phone: form.phone,
            iso_code: form.country.code,
            dial_code: form.country.dial_code,
            picture: form.picture,
            id_gender: form.id_gender
        }

        const data = await BD_ACTION_PUT('auth', 'update_user', body)

        if (!data.error) {
            setJWT(data.msg.token)
            setTimeout(() => {
                setLoad(false)
            }, 3000);
        } else {
            setLoad(false)
            setErrorAlert(true)
            setTimeout(() => {
                setErrorAlert(false)
            }, 5000);
        }
    }

    const change_password = async () => {
        setLoad(true)
        const data = await BD_ACTION_POST('auth', 'create_new_password', resetPassword)

        if (!data.error) {
            setResetPassword({
                email: decodedDataJWT().email,
                password: '',
                repeat_password: ''
            })
            setLoad(false)
            show_password_dialog()
        } else {
            setLoad(false)
        }
    }

    const show_password_dialog = () => {
        setPasswordDialog(!passwordDialog)
    }

    const show_email_dialog = () => {
        setEmailDialog(!emailDialog)
    }

    return (
        <>
            <Loader load={load} />
            <div className='flex flex-col gap-6'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl'>My Profile</h1>
                    <button className='flex items-center justify-center gap-1 text-sm bg-yummy-800 text-white px-3 py-2 rounded-xl hover:bg-yummy-600 transition-all shadow-lg' onClick={put_user}>Update <MdSave /></button>
                </div>

                <div className='flex flex-col items-center justify-center gap-4'>
                    <img src={form.picture} className='rounded-full shadow-lg w-[150px] h-[150px]' />
                    <input type='file' id='actual-btn' hidden onChange={upload_images} />
                    <label htmlFor='actual-btn' className='text-sky-500 flex items-center cursor-pointer justify-center gap-1 hover:bg-gray-100 px-4 py-2 rounded-xl hover:text-sky-400'>Choose File <BiArrowFromBottom /></label>
                </div>

                <div className='grid grid-cols-2 gap-6 pt-6 pb-6'>
                    <TextField
                        label='First Name'
                        value={form.first_name}
                        onChange={event => setForm({ ...form, first_name: event.target.value })}
                        variant='standard' />
                    <TextField
                        label='Last Name'
                        value={form.last_name}
                        onChange={event => setForm({ ...form, last_name: event.target.value })}
                        variant='standard' />
                    <TextField
                        label='Second Last Name (Optional)'
                        value={form.second_last_name}
                        onChange={event => setForm({ ...form, second_last_name: event.target.value })}
                        variant='standard' />
                    <TextField
                        label='Phone'
                        value={form.phone}
                        variant='standard' />
                    <TextField
                        disabled
                        label='Gender'
                        value={`${gender[form.id_gender - 1].emoji} ${gender[form.id_gender - 1].name}`}
                        variant='standard' />
                    <TextField
                        disabled
                        label='Profile'
                        value={`${profile[form.type_user_id - 1].emoji} ${profile[form.type_user_id - 1].name}`}
                        variant='standard' />
                    <TextField
                        disabled
                        label='@Username'
                        value={form.username}
                        onChange={event => setForm({ ...form, username: event.target.value })}
                        variant='standard' />
                    <TextField
                        disabled
                        label='E-Mail'
                        value={form.email}
                        variant='standard' />
                    <TextField
                        select
                        label='Country'
                        name='country'
                        value={form.country}
                        onChange={event => setForm({ ...form, country: event.target.value })}
                        variant='standard'
                        fullWidth
                        margin='normal'
                    >
                        {
                            countries.map((country, index) => (
                                <MenuItem key={index} value={country}>
                                    {country.emoji} | {country.name} {country.code} | {country.dial_code}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </div>
                <div className='flex flex-col gap-6 text-yummy-800 items-end'>
                    <span className='flex gap-2 items-center cursor-pointer hover:text-yummy-600 transition-colors' onClick={show_password_dialog}>Change My Password <MdPassword /></span>
                    {/* <span className='flex gap-2 items-center cursor-pointer hover:text-yummy-600 transition-colors' onClick={show_email_dialog}>Change My E-Mail <MdEmail /></span> */}
                </div>
            </div>
            <Dialog open={passwordDialog} onClose={show_password_dialog}>
                <div className='flex flex-col gap-6 px-8 py-4'>
                    <div className='flex justify-end gap-2 xl:w-[500px] lg:w-[500px] md:w-[500px]'>
                        <button onClick={change_password} className='bg-yummy-800 text-white text-[12.5px] w-20 h-10 rounded-xl flex items-center justify-center gap-2 hover:bg-yummy-600 transition-all disabled:bg-yummy-600' disabled={resetPassword.password == '' || resetPassword.repeat_password == '' || resetPassword.password !== resetPassword.repeat_password}>Send<MdSend /></button>
                        <button onClick={show_password_dialog} className='bg-yummy-800 text-white w-10 h-10 rounded-xl flex items-center justify-center gap-2 hover:bg-yummy-600 transition-all disabled:bg-yummy-600'><MdClose /></button>
                    </div>
                    <TextField
                        disabled
                        fullWidth
                        label='E-Mail'
                        value={resetPassword.email}
                        variant='standard' />
                    <TextField
                        fullWidth
                        label='New Password'
                        value={resetPassword.password}
                        onChange={event => setResetPassword({ ...resetPassword, password: event.target.value })}
                        variant='standard' />
                    <TextField
                        error={resetPassword.password !== resetPassword.repeat_password}
                        fullWidth
                        label='Repeat New Password'
                        value={resetPassword.repeat_password}
                        onChange={event => setResetPassword({ ...resetPassword, repeat_password: event.target.value })}
                        variant='standard' />
                    {
                        resetPassword.password !== resetPassword.repeat_password && (
                            <span className='text-red-500 text-[12px] mt-[-20px]'>Passwords Not Matched</span>
                        )
                    }
                </div>
            </Dialog >
            {
                errorAlert && (
                    <Alert severity='success' className='absolute bottom-2 left-2 transition-all duration-300 z-50'>Server Error</Alert>
                )
            }
        </>
    )
}

export default MyProfile
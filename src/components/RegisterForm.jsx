import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { BiArrowFromBottom } from 'react-icons/bi'
import Loader from './Loader'
import { countries } from '../services/country_codes'
import { gender } from '../services/gender'
import { profile } from '../services/profile'
import SignUp from '../assets/animations/SignUp.mp4'
import { BD_ACTION_POST } from '../services/master'

function RegisterForm() {
  const navigate = useNavigate()
  const [load, setLoad] = useState(false)
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    type_user_id: 1,
    first_name: '',
    last_name: '',
    second_last_name: '',
    phone: '',
    country: {},
    picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    id_gender: 1
  })

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

  const post_new_user = async () => {
    const body = {
      username: form.username,
      email: form.email,
      password: form.password,
      type_user_id: form.type_user_id,
      first_name: form.first_name,
      last_name: form.last_name,
      second_last_name: form.second_last_name,
      phone: form.phone,
      iso_code: form.country.code,
      dial_code: form.country.dial_code,
      picture: form.picture,
      id_gender: form.id_gender
    }

    const data = await BD_ACTION_POST('auth', 'sign_up', body)

    if (!data.error) {
      setLoad(true)
      setTimeout(() => {
        navigate(`/auth/sign_in`)
      }, 2000)
    } else {
      setLoad(false)
    }
  }

  return (
    <>
      <Loader load={load} />
      <div className='bg-yummy-800 min-h-screen flex flex-row items-center relative justify-center h-full'>

        {/* Contenedor del formulario */}
        <div className='xl:w-1/2 w-full flex items-center justify-center'>
          <div className='w-[80%] bg-white p-10 rounded-3xl border border-gray-100'>
            <h2 className='text-gray-500 text-xl font-bold text-center'>Personal Information</h2>
            <div className='flex flex-col'>
              <TextField
                label='First Name'
                name='firstName'
                value={form.first_name}
                onChange={event => setForm({ ...form, first_name: event.target.value })}
                variant='standard'
                fullWidth
                margin='normal'
                placeholder='Enter your First Name'
              />

              <div className='flex flex-row gap-6'>
                <TextField
                  label='Last Name'
                  name='lastName'
                  value={form.last_name}
                  onChange={event => setForm({ ...form, last_name: event.target.value })}
                  variant='standard'
                  fullWidth
                  margin='normal'
                  placeholder='Enter your Last Name'
                />

                <TextField
                  label='Second Last Name'
                  name='secondLastName'
                  value={form.second_last_name}
                  onChange={event => setForm({ ...form, second_last_name: event.target.value })}
                  variant='standard'
                  fullWidth
                  margin='normal'
                  placeholder='Enter your Second Last Name'
                />
              </div>

              <div className='flex xl:flex-row flex-col gap-6'>
                <div className='xl:w-1/2 w-full'>
                  <TextField
                    label='Phone'
                    name='phone'
                    value={form.phone}
                    onChange={event => setForm({ ...form, phone: event.target.value })}
                    variant='standard'
                    fullWidth
                    margin='normal'
                    placeholder='Enter your Phone'
                  />
                </div>
                <div className='xl:w-1/2 w-full'>
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
              </div>

              <div className='flex gap-6'>
                <TextField
                  select
                  label='Gender'
                  name='gender'
                  value={form.id_gender}
                  onChange={event => setForm({ ...form, id_gender: event.target.value })}
                  variant='standard'
                  fullWidth
                  margin='normal'
                >
                  {
                    gender.map((gender, index) => (
                      <MenuItem key={index} value={gender.id}>
                        {gender.emoji} | {gender.name}
                      </MenuItem>
                    ))
                  }
                </TextField>

                <TextField
                  select
                  label='Profile'
                  name='profile'
                  value={form.type_user_id}
                  onChange={event => setForm({ ...form, type_user_id: event.target.value })}
                  variant='standard'
                  fullWidth
                  margin='normal'
                >
                  {
                    profile.map((profile, index) => (
                      <MenuItem key={index} value={profile.id}>
                        {profile.emoji} | {profile.name}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </div>
            </div>

            <h2 className='text-gray-500 text-xl font-bold text-center mt-10 mb-5'>Account Information</h2>
            <div className='flex flex-col items-center justify-center gap-4'>
              <img src={form.picture} className='rounded-full shadow-lg w-[100px] h-[100px]' />
              <input type='file' id='actual-btn' hidden onChange={upload_images} />
              <label htmlFor='actual-btn' className='text-sky-500 flex items-center cursor-pointer justify-center gap-1 hover:bg-gray-100 px-4 py-2 rounded-xl hover:text-sky-400'>Choose File <BiArrowFromBottom /></label>
            </div>
            <div className='flex flex-row gap-6'>
              <TextField
                label='Username'
                name='username'
                type='text'
                value={form.username}
                onChange={event => setForm({ ...form, username: event.target.value })}
                variant='standard'
                fullWidth
                margin='normal'
                placeholder='Enter your username'
              />

              <TextField
                label='Email'
                name='email'
                type='text'
                value={form.email}
                onChange={event => setForm({ ...form, email: event.target.value })}
                variant='standard'
                fullWidth
                margin='normal'
                placeholder='Enter your email'
              />
            </div>

            <div className='flex flex-row gap-6'>
              <TextField
                label='Password'
                name='password'
                type='password'
                value={form.password}
                onChange={event => setForm({ ...form, password: event.target.value })}
                variant='standard'
                fullWidth
                margin='normal'
                placeholder='Enter your password'
              />


              <TextField
                label='Confirm Password'
                name='confirmPassword'
                type='password'
                value={form.confirm_password}
                onChange={event => setForm({ ...form, confirm_password: event.target.value })}
                variant='standard'
                fullWidth
                margin='normal'
              />
            </div>

            <div className='flex justify-between mt-8'>
              <Link to='/auth/sign_in' className='text-yummy-800 hover:text-yummy-600 transition-all duration-200'>
                Return to Sign In
              </Link>
              <Link onClick={() => post_new_user()} className='text-yummy-800 hover:text-yummy-600 transition-all duration-200'>
                Register Now
              </Link>
            </div>
          </div>
        </div>

        {/* Contenedor de la animación */}
        <div className='hidden relative xl:flex w-1/2 items-center justify-center bg-white h-screen'>
          <video loop autoPlay muted>
            <source src={SignUp} type='video/mp4' />
          </video>
        </div>
      </div >
    </>
  )
}


export default RegisterForm
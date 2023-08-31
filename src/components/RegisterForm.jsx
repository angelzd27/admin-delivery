import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
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
    country: countries.find(country => country.code == 'MX'),
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
      iso_code: form.country.code || 'MX',
      dial_code: form.country.dial_code || '+52',
      picture: form.picture,
      id_gender: form.id_gender
    }

    console.log(body)

    const data = await BD_ACTION_POST('auth', 'sign_up', body)

    if (!data.error) {
      setLoad(true)
      console.log("Data Enviado")
      setTimeout(() => {
        navigate(`/auth/sign_in`)
      }, 2000)
    } else {
      console.log("Error al enviar data")
      setLoad(false);
    }
  }

  //Validacion FirstName
  const [errorFirstName, setErrorFirstName] = useState({
    error: false,
    message: "",
  })
  const validateFirstName = (firstName) => {
    const regex = /^[A-Za-z\s]+$/; //Only letters and spaces
    return firstName.length >= 3 && regex.test(firstName);
  };
  
  //Validacion LastName
  const [errorLastName, setErrorLastName] = useState({
    error: false,
    message: "",
  })
  const validateLastName = (lastName) => {
    const regex = /^[A-Za-z\s]+$/; //Only letters and spaces
    return lastName.length >= 3 && regex.test(lastName);
  };

  //Validacion Phone Number
  const [errorPhone, setErrorPhone] = useState({
    error: false,
    message: "",
  });

  //Validacion Email
  const [errorEmail, setErrorEmail] = useState({
    error: false,
    message: "",
  })

  const validateEmail = (email) => {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    return regex.test(email);
  }

  //Validacion Password
  const [errorPassword, setErrorPassword] = useState({
    error: false,
    message: "",
  })

  const validatePassword = (password) => {
    //Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password);
  }

  //Estados para mostrar u ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };


  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  //Validate Confirm Password
  const [errorConfirmPassword, setErrorConfirmPassword] = useState({
    error: false,
    message: "",
  });

  const validateConfirmPassword = (confirmPassword) => {
    return confirmPassword === form.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //VALIDACION FIRST NAME
    if (validateFirstName(form.first_name)) {
      setErrorFirstName({
        error: false,
        message: "",
      });
    } else {
      setErrorFirstName({
        error: true,
        message: "First Name must have at least 3 letters and no numbers",
      });
    }

    //VALIDACION LAST NAME
    if (validateLastName(form.last_name)) {
      setErrorLastName({
        error: false,
        message: "",
      });
    } else {
      setErrorLastName({
        error: true,
        message: "Last Name must have at least 3 letters and no numbers",
      });
    }

    //VALIDACION EMAIL
    if (validateEmail(form.email)) {
      setErrorEmail({
        error: false,
        message: "",
      });
    } else {
      setErrorEmail({
        error: true,
        message: "Wrong email format"
      });
    }

    //VALIDACION PASSWORD
    if (validatePassword(form.password)) {
      setErrorPassword({
        error: false,
        message: "",
      });
    } else {
      setErrorPassword({
        error: true,
        message: "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
      });
    }
    
    // Comprueba si todos los errores están en error: false
    if (
      !errorFirstName.error &&
      !errorLastName.error &&
      !errorPhone.error &&
      !errorEmail.error &&
      !errorPassword.error &&
      !errorConfirmPassword.error
    ) {
      // Ejecuta la función post_new_user si no hay errores
      try {
        // Realizar la solicitud POST
        post_new_user();

      } catch (error) {
        // Manejo de errores si post_new_user falla
        console.error("Error registering user:", error);
      }
    }
  };
  

  return (
    <>
      <Loader load={load} />
      <div className='bg-yummy-800 min-h-screen flex flex-row items-center relative justify-center h-full'>

        {/* Contenedor del formulario */}
        <div className='xl:w-1/2 w-full flex items-center justify-center'>
          <div className='w-[80%] bg-white p-10 rounded-3xl border border-gray-100'>
            <h2 className='text-gray-500 text-xl font-bold text-center'>Personal Information</h2>
            <form onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <TextField
                required
                label='First Name'
                name='firstName'
                type="text"
                value={form.first_name}
                onChange={event => {
                  setForm({ ...form, first_name: event.target.value });
                }}
                variant='standard'
                fullWidth
                margin='normal'
                placeholder='Enter your First Name'
                helperText={errorFirstName.message}
                error={errorFirstName.error}
              />

              <div className='flex flex-row gap-6'>
                <TextField
                  required
                  label='Last Name'
                  name='lastName'
                  type="text"
                  value={form.last_name}
                  onChange={event => setForm({ ...form, last_name: event.target.value })}
                  variant='standard'
                  fullWidth
                  margin='normal'
                  placeholder='Enter your Last Name'
                  helperText={errorLastName.message}
                  error={errorLastName.error}
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
                      required
                      label='Phone'
                      name='phone'
                      type="tel"
                      value={form.phone}
                      onChange={(event) => {
                        const inputPhoneNumber = event.target.value;
                        if (/^\d*$/.test(inputPhoneNumber)) { // Verifica si la entrada contiene solo dígitos
                          setForm({ ...form, phone: inputPhoneNumber });
                          if (inputPhoneNumber.length === 10) {
                            setErrorPhone({
                              error: false,
                              message: "",
                            });
                          } else {
                            setErrorPhone({
                              error: true,
                              message: "Phone Number must have 10 numbers",
                            });
                          }
                        }
                      }}
                      onKeyPress={(event) => {
                        const keyPressed = event.key;
                        if (!/\d/.test(keyPressed)) { // Cancela la pulsación si la tecla no es un dígito
                          event.preventDefault();
                        }
                      }}
                      variant='standard'
                      fullWidth
                      margin='normal'
                      placeholder='Enter your Phone'
                      helperText={errorPhone.message}
                      error={errorPhone.error}
                    />

                </div>
                <div className='xl:w-1/2 w-full'>
                  <TextField
                    required
                    select
                    label='Country'
                    name='country'
                    value={form.country.iso_code}
                    onChange={event => setForm({ ...form, country: { iso_code: event.target.value } })}
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
                  required
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
                  required
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
                required
                label='Email'
                name='email'
                type='email'
                value={form.email}
                onChange={event => setForm({ ...form, email: event.target.value })}
                variant='standard'
                fullWidth
                helperText={errorEmail.message}
                error={errorEmail.error}
                margin='normal'
                placeholder='Enter your email'
              />
            </div>

            <div className='flex flex-row gap-6'>
              <TextField
                required
                label='Password'
                name='password'
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={event => setForm({ ...form, password: event.target.value })}
                variant='standard'
                fullWidth
                helperText={errorPassword.message}
                error={errorPassword.error}
                margin='normal'
                placeholder='Enter your password'
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handlePasswordToggle} edge='end'>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  ),
                }}
              />

                <TextField
                  label='Confirm Password'
                  name='confirmPassword'
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirm_password}
                  onChange={event => {
                    const newConfirmPassword = event.target.value;
                    setForm({ ...form, confirm_password: newConfirmPassword });
                    setErrorConfirmPassword({
                      error: !validateConfirmPassword(newConfirmPassword),
                      message: 'Passwords do not match', // Cambia el mensaje según tus necesidades
                    });
                  }}
                  variant='standard'
                  fullWidth
                  margin='normal'
                  helperText={errorConfirmPassword.message}
                  error={errorConfirmPassword.error}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleConfirmPasswordToggle} edge="end">
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    ),
                  }}
                />

            </div>

            <div className='flex justify-between mt-8'>
            <Link to='/auth/sign_in' className='text-yummy-800 hover:text-yummy-600 transition-all duration-200'>
                Return to Sign In
            </Link>

              <button type='submit' className='text-yummy-800 hover:text-yummy-600 transition-all duration-200'>
                Register Now
              </button>
            </div>
            </form>
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
import { useState, useEffect } from 'react'
import { TextField, Alert, Dialog } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { BiArrowFromBottom, BiSolidUserPlus } from 'react-icons/bi'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import axios from 'axios'
import { countries } from '../services/country_codes'
import { gender } from '../services/gender'
import { profile } from '../services/profile'
import { BD_ACTION_POST } from '../services/master'
import AlertSignIn from './AlertSignIn'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [confirmAlert, setConfirmAlert] = useState(false);
  const navigate = useNavigate()
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
    country: countries.find(country => country.code === "MX"),
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

      const data = await BD_ACTION_POST('auth', 'sign_up', body)

      if (!data.error) {
        setConfirmAlert(true);

        setForm({
          username: '',
          email: '',
          password: '',
          confirm_password: '',
          type_user_id: 1,
          first_name: '',
          last_name: '',
          second_last_name: '',
          phone: '',
          country: countries.find(country => country.code === "MX"),
          picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          id_gender: 1
        })

        

        setTimeout(() => {
          navigate('/home/users')
          setConfirmAlert(false);
        }, 5000)
      } else {
        console.log("Error al enviar data")
       
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
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-6'>
          <div className='flex justify-between'>
            <h1 className='text-2xl'>Sign Up</h1>
            <div className='flex gap-3'>
            
            <button type='submit' className='flex items-center justify-center gap-1 text-sm bg-yummy-800 text-white px-3 py-2 rounded-xl hover:bg-yummy-600 transition-all shadow-lg disabled:bg-yummy-600'>
              Create User <BiSolidUserPlus />
            </button>
            </div>
           
          </div>

          <div className='flex gap-4'>
            <img className={`object-cover rounded-full w-32 h-32`}
              src={form.picture} />
            <input type='file' id='actual-btn' hidden onChange={upload_images} />
            <label htmlFor='actual-btn' className='text-sky-500 flex items-center cursor-pointer justify-center gap-1 hover:bg-gray-100 px-4 py-2 rounded-xl hover:text-sky-400'>Choose File <BiArrowFromBottom /></label>

            <div className='ml-1 mt-5'>
              <TextField
                required
                label='First Name'
                name='firstName'
                type='text'
                value={form.first_name}
                onChange={event => 
                  setForm({ ...form, first_name: event.target.value })}
                variant='standard'
                placeholder='Write your name here...'
                helperText={errorFirstName.message || 'First Name is required'  }
               
                style={{ width: '250px' }}
              />
              
            </div>

            <div className='ml-1 mt-5'>
              <TextField
                required
                label='Last Name'
                name='lastName'
                value={form.last_name}
                onChange={event => setForm({ ...form, last_name: event.target.value })}
                variant='standard'
                placeholder='Write your last name here...'
                helperText={errorLastName.message || 'Last Name is required'}
                error={errorLastName.error}
                style={{ width: '250px' }}
              />
            </div>

            <div className='ml-1 mt-5'>
              <TextField
                label='Second Last Name (Optional)'
                value={form.second_last_name}
                onChange={event => setForm({ ...form, second_last_name: event.target.value })}
                variant='standard'
                style={{ width: '250px' }}
              />
            </div>

          </div>

          <div className='grid grid-cols-2 gap-6'>

            <TextField
              required
              select
              label='Country'
              name='country'
              value={form.country}
              onChange={event => setForm({ ...form, country: event.target.value })}
              variant='standard'
              fullWidth

            >
              {
                countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country.emoji} | {country.name} {country.code} | {country.dial_code}
                  </MenuItem>
                ))
              }
            </TextField>

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
              placeholder='Enter your Phone'
              helperText={errorPhone.message || 'Phone is required'}
              error={errorPhone.error}
            />

            <TextField
              required
              select
              label='Gender'
              name='gender'
              value={form.id_gender}
              onChange={event => setForm({ ...form, id_gender: event.target.value })}
              variant='standard'
              fullWidth

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
            >
              {
                profile.map((profile, index) => (
                  <MenuItem key={index} value={profile.id}>
                    {profile.emoji} | {profile.name}
                  </MenuItem>
                ))
              }
            </TextField>
            <TextField
              label='@Username'
              value={form.username}
              onChange={event => setForm({ ...form, username: event.target.value })}
              variant='standard' />
            <TextField
              required
              label='Email'
              name='email'
              type='email'
              value={form.email}
              onChange={event => setForm({ ...form, email: event.target.value })}
              variant='standard'
              fullWidth
              helperText={errorEmail.message || 'E-mail is required'}
              error={errorEmail.error}
              placeholder='Enter your email'
            />

            <TextField
              required
              label='Password'
              name='password'
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(event) => {
                const inputPassword = event.target.value;
                if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(inputPassword))) {
                  // La condición se cumple si la cadena no tiene al menos 8 caracteres,
                  // una letra minúscula, una letra mayúscula, un número y un carácter especial.
                  setForm({ ...form, password: inputPassword });
                  setErrorPassword({
                    error: true,
                    message: "The password must be at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character.",
                  });
                } else {
                  setForm({ ...form, password: inputPassword });
                  setErrorPassword({
                    error: false,
                    message: "",
                  });
                }
              }}
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
              required
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
        </div>

        {
          confirmAlert && (
            <AlertSignIn textBig={'Success!'} textLittle={'You have successfully created a new user!'} colorFondo={'green-300'} colorBorde={'green-500'} colorTexto={'green-700'} icono={true} />
          )
        }
      </form>
    </>
  )
}

export default SignUp


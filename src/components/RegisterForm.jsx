import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { countries } from '../services/country_codes'
import { gender } from '../services/gender'
import { profile } from '../services/profile'
import SignUp from '../assets/animations/SignUp.mp4'
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    secondLastName: '',
    phone: '',
    country: '',
    gender: '',
    profile: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  })

  //Estados para mostrar u ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  //Error FirstName
  const [firstName, setFirstName] = useState("")
  const [errorFirstName, setErrorFirstName] = useState({
    error: false,
    message: "",
  })
  const validateFirstName = (firstName) => {
    const regex = /^[A-Za-z\s]+$/; //Only letters and spaces
    return firstName.length >= 3 && regex.test(firstName);
  };

  //Error LastName
  const [lastName, setLastName] = useState("")
  const [errorLastName, setErrorLastName] = useState({
    error: false,
    message: "",
  })
  const validateLastName = (lastName) => {
    const regex = /^[A-Za-z\s]+$/; //Only letters and spaces
    return lastName.length >= 3 && regex.test(lastName);
  };

  //Error SecondLastName
  const [secondLastName, setSecondLastName] = useState("")

  const [errorPhone, setErrorPhone] = useState({
    error: false,
    message: "",
  });
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^[0-9]*$/; // Numbers only
    return regex.test(phoneNumber) && phoneNumber.length >= 10 && phoneNumber.length <= 10;
  };

  //Error Email
  const [email, setEmail] = useState("")
  const [errorEmail, setErrorEmail] = useState({
    error: false,
    message: "",
  })

  const validateEmail = (email) => {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    return regex.test(email);
  }

  //Error Password
  const [password, setPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState({
    error: false,
    message: "",
  })

  const validatePassword = (password) => {
    //Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password);
  }

  //Error Confirm Password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState({
    error: false,
    message: "",
  });

  const validateConfirmPassword = (confirmPassword) => {
    return confirmPassword === password;
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const send = () => {
    const body = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      type_user_id: formData.profile,
      first_name: formData.firstName,
      last_name: formData.lastName,
      second_last_name: formData.secondLastName,
      phone: formData.phone,
      iso_code: formData.country.code,
      dial_code: formData.country.dial_code,
      picture: formData.picture,
      id_gender: formData.gender
    }

    console.log(body)
  }

  const image = () => {
    console.log('FUCK YOU')
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateFirstName(firstName)) {
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

    if (validateLastName(lastName)) {
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

    if (validateEmail(email)) {
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

    if (validatePassword(password)) {
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

    if (validateConfirmPassword(confirmPassword)) {
      setErrorConfirmPassword({
        error: false,
        message: "",
      });
    } else {
      setErrorConfirmPassword({
        error: true,
        message: "Passwords do not match",
      });
    }
  }

  return (
    <>
      <div className='bg-yummy-800 min-h-screen flex flex-row items-center relative justify-center h-full'>

        {/* Contenedor del formulario */}
        <div className='xl:w-1/2 w-full flex items-center justify-center'>
          <div className='w-[80%] bg-white p-10 rounded-3xl border border-gray-100'>
            <h2 className='text-gray-500 text-xl font-bold text-center'>Personal Information</h2>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col'>
                <TextField
                  required
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  variant="standard"
                  fullWidth
                  margin="normal"
                  placeholder="Enter your First Name"
                  helperText={errorFirstName.message}
                  error={errorFirstName.error}
                />

                <div className='flex flex-row gap-6'>
                  <TextField
                    required
                    label="Last Name"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="standard"
                    fullWidth
                    margin="normal"
                    placeholder="Enter your Last Name"
                    helperText={errorLastName.message}
                    error={errorLastName.error}
                  />

                  <TextField
                    label="Second Last Name (Optional)"
                    name="secondLastName"
                    type="text"
                    value={secondLastName}
                    onChange={(e) => setSecondLastName(e.target.value)}
                    variant="standard"
                    fullWidth
                    margin="normal"
                    placeholder="Enter your Second Last Name (Optional)"
                  />
                </div>

                <div className='flex flex-row gap-6'>

                  <div className='xl:w-1/2 w-full'>
                    <TextField
                      select
                      required
                      label='Country'
                      name='country'
                      value={formData.country}
                      onChange={handleInputChange}
                      variant='standard'
                      fullWidth
                      margin='normal'
                    >
                      {
                        countries.map((country, index) => (
                          <MenuItem key={index} value={country.code}>
                            {country.emoji} | {country.name} {country.code} | {country.dial_code}
                          </MenuItem>

                        ))
                      }
                    </TextField>
                  </div>

                  <div className='xl:w-1/2 w-full'>
                    <TextField
                      required
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          phone: value,
                        }));
                        if (validatePhoneNumber(value)) {
                          setErrorPhone({
                            error: false,
                            message: "",
                          });
                        } else {
                          setErrorPhone({
                            error: true,
                            message: "Please enter a valid 10-digit phone number",
                          });
                        }
                      }}
                      variant="standard"
                      fullWidth
                      margin="normal"
                      placeholder="Enter your Phone"
                      helperText={errorPhone.message}
                      error={errorPhone.error}
                    />
                  </div>
                </div>

                <div className='flex gap-6'>
                  <TextField
                    select
                    required
                    label='Gender'
                    name='gender'
                    value={formData.gender}
                    onChange={handleInputChange}
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
                    required
                    label='Profile'
                    name='profile'
                    value={formData.profile}
                    onChange={handleInputChange}
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
              <div className='flex flex-col items-center gap-4'>
                <div className="relative w-36 h-36">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-[rgba(0,0,0,0.6)] rounded-full cursor-pointer" onClick={() => { image() }}>
                    <p className="text-white text-center text-sm select-none">Change Profile<br />Picture</p>
                  </div>
                  <img src={formData.picture} className='w-36 h-36 rounded-full select-none' />
                </div>
              </div>
              <div className='flex flex-row gap-6'>
                <TextField
                  label='Username'
                  name='username'
                  type='text'
                  value={formData.username}
                  onChange={handleInputChange}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="standard"
                  fullWidth
                  margin="normal"
                  helperText={errorConfirmPassword.message}
                  error={errorConfirmPassword.error}
                  placeholder="Confirm your password"
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
                <button onClick={() => send()} className='text-yummy-800 hover:text-yummy-600 transition-all duration-200'>
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
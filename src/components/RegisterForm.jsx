import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import { countries } from '../assets/json/country_codes';

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    secondLastName: '',
    phone: '',
    isoCode: '',
    dialCode: '',
    gender: '',
    profile: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function isValidEmail(email) {

    // Expresión regular para validar el formato de un email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);

  }

  const handleRegister = () => {
    // Realizar validaciones
    const { email, password, confirmPassword } = formData;

    // Validar que todos los campos estén completos
    if (Object.values(formData).some((value) => value === '')) {
      setErrorMessage('Please complete all fields.');
      setShowError(true);
      return;
    } else {
      setErrorMessage('');
    }

    // Validar campo email
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }

    // Validar que la contraseña cumpla con los requisitos
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      setShowError(true);
      return;
    }

    setShowError(false);

    // Si las validaciones son exitosas, aquí puedes guardar los datos en el backend
    console.log('Formulario enviado:', formData);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (

    <>
      <div className='bg-yummy-800 min-h-screen flex flex-row items-center relative justify-center h-full'>

        {/* Contenedor del formulario */}
        <div className='xl:w-1/2 w-full flex items-center justify-center'>
          <div className='w-[80%] bg-white p-10 rounded-3xl border border-gray-100'>
            <h2 className='text-gray-500 text-xl font-bold text-center'>Personal Information</h2>
            <div className='flex flex-col'>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                variant='standard'
                fullWidth
                margin="normal"
                placeholder="Enter your First Name"
              />

              <div className='flex flex-row gap-6'>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  variant='standard'
                  fullWidth
                  margin="normal"
                  placeholder="Enter your Last Name"
                />

                <TextField
                  label="Second Last Name"
                  name="secondLastName"
                  value={formData.secondLastName}
                  onChange={handleInputChange}
                  variant='standard'
                  fullWidth
                  margin="normal"
                  placeholder="Enter your Second Last Name"
                />
              </div>

              <div className='flex flex-row gap-6'>
                <div className='w-1/2'>
                  <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant='standard'
                    fullWidth
                    margin="normal"
                    placeholder="Enter your Phone"
                  />
                </div>

                <div className='w-1/2 flex flex-row gap-6'>
                  <TextField
                    select
                    label="ISO Code"
                    name="isoCode"
                    value={formData.isoCode}
                    onChange={handleInputChange}
                    variant='standard'
                    fullWidth
                    margin="normal"
                  >
                    {
                      countries.map((country, index) => (
                        <MenuItem key={index} value={country.code}>
                          {country.emoji} | {country.code} - {country.name}
                        </MenuItem>
                      ))
                    }
                  </TextField>

                  <TextField
                    select
                    label="DIAL Code"
                    name="dialCode"
                    value={formData.dialCode}
                    onChange={handleInputChange}
                    variant='standard'
                    fullWidth
                    margin="normal"
                  >
                    {
                      countries.map((country, index) => (
                        <MenuItem key={index} value={country.dial_code}>
                          {country.emoji} | {country.dial_code} - {country.name}
                        </MenuItem>
                      ))
                    }
                  </TextField>
                </div>
              </div>

              <div className='flex gap-6'>
                <TextField
                  select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  variant='standard'
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="gender0">Select a gender</MenuItem>
                  <MenuItem value="gender1">Male</MenuItem>
                  <MenuItem value="gender2">Female</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Profile"
                  name="profile"
                  value={formData.profile}
                  onChange={handleInputChange}
                  variant='standard'
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="profile0">Select a profile</MenuItem>
                  <MenuItem value="profile1">Admin</MenuItem>
                  <MenuItem value="profile2">User</MenuItem>
                </TextField>
              </div>
            </div>

            <h2 className='text-gray-500 text-xl font-bold text-center mt-10'>Account Information</h2>
            <div className='flex flex-row gap-6'>
              <TextField
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                variant='standard'
                fullWidth
                margin="normal"
                placeholder="Enter your username"
              />

              <TextField
                label="Email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                variant='standard'
                fullWidth
                margin="normal"
                placeholder="Enter your email"
              />
            </div>

            <div className='flex flex-row gap-6'>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                variant='standard'
                fullWidth
                margin="normal"
                placeholder="Enter your password"
              />


              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                variant='standard'
                fullWidth
                margin="normal"
              />
            </div>

            <div className='flex justify-between mt-8'>
              <Link to='/auth/sign_in' className='text-yummy-800 hover:text-yummy-600 transition-all duration-200'>
                Return to Sign In
              </Link>
              <Link onClick={handleRegister} className='text-yummy-800 hover:text-yummy-600 transition-all duration-200'>
                Register Now
              </Link>
            </div>

            {showError && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <p className="text-yummy-800 text-center">{errorMessage}</p>
                  <button onClick={() => setShowError(false)} className="mt-4 bg-yummy-800 text-white font-semibold py-2 px-4 rounded-xl">
                    Close
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contenedor de la animación */}
        <div className="hidden relative lg:flex w-1/2 items-center justify-center bg-white h-screen">
        </div>

      </div >
    </>
  )
}

export default RegisterForm
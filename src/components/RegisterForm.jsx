import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';



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
                        
      <div className='bg-yummy-800 min-h-screen flex flex-col relative'>
      <div className='flex h-full'>
        {/* Contenedor del formulario */}
        <div className='w-1/2 flex items-center justify-center'>
          
            <div className='w-2/3 bg-white px-4 py-4 rounded-3xl border border-gray-100 p-0'>


              <h2 className=' mt-5 text-gray-500 text-x font-bold text-center mb-2'>Personal Information</h2>
              <div className="ml-5 mr-5">
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  placeholder="Enter your First Name"

                />
                
              </div>
              <div className="ml-5  mr-5 grid grid-cols-2 gap-2 mt-2">
                <div>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Enter your Last Name"
                  />

                        
                </div>
                <div>
                  <TextField
                    label="Second Last Name"
                    name="secondLastName"
                    value={formData.secondLastName}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Enter your Second Last Name"
                  />

                        
                </div>
              </div>

              <div className="ml-5  mr-5 grid grid-cols-3 gap-2 mt-2">
                <div>
                  <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Enter your Phone"
                  />

                      
                </div>
                <div>
                  <TextField
                    select
                    label="ISO Code"
                    name="isoCode"
                    value={formData.isoCode}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="iso1">Select an ISO</MenuItem>
                    <MenuItem value="iso1">ISO 1</MenuItem>
                    <MenuItem value="iso2">ISO 2</MenuItem>
                    <MenuItem value="iso3">ISO 3</MenuItem>
                  </TextField>

                </div>
                <div>
                  <TextField
                    select
                    label="DIAL Code"
                    name="dialCode"
                    value={formData.dialCode}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="dial0">Select a DIAL</MenuItem>
                    <MenuItem value="dial1">DIAL 1</MenuItem>
                    <MenuItem value="dial2">DIAL 2</MenuItem>
                    <MenuItem value="dial3">DIAL 3</MenuItem>
                  </TextField>

                </div>
                        
              </div>

              <div className=" mr-5 ml-5 grid grid-cols-2 gap-2 mt-2">
                <div>
                  <TextField
                    select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="gender0">Select a gender</MenuItem>
                    <MenuItem value="gender1">Male</MenuItem>
                    <MenuItem value="gender2">Female</MenuItem>
                  </TextField>

                </div>

                <div>
                  <TextField
                    select
                    label="Profile"
                    name="profile"
                    value={formData.profile}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="profile0">Select a profile</MenuItem>
                    <MenuItem value="profile1">Admin</MenuItem>
                    <MenuItem value="profile2">User</MenuItem>
                  </TextField>

                </div>
              </div>

              <h2 className='text-gray-500 text-x font-bold text-center mt-8'>Account Information</h2>
              <div className='ml-5  mr-5'>
                <TextField
                  label="Username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  placeholder="Enter your username"
                />

                        
              </div>

              <div className='ml-5  mr-5'>
                <label className="text-white block text-sm font-medium mb-2">Email:</label>
                <TextField
                  label="Email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  placeholder="Enter your email"
                />

                        
              </div>

              <div className="ml-5  mr-5 grid grid-cols-2 gap-2 mt-2">
                
                  <div>
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      placeholder="Enter your password"
                    />

                  </div>
                      
                  <div>
    
                      <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />

                          
                          
                  </div>
                         
              </div>

              <button onClick={handleRegister} 
                className="ml-48 bg-yummy-800 text-white font-semibold py-2 px-4 rounded-xl mt-4 ">
                  Register
              </button>   

              {showError && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
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
          <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white"> 
          </div>

          
    </div>
    
    </div>
             

   


        
           
        
  </>
  )
  }

export default RegisterForm
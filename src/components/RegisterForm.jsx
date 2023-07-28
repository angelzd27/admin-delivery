import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'



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
                
        
        <div className="bg-yummy-800 flex w-full h-fit ">

        {/* Contenedor de la animación */}
        <div className="hidden relative lg:flex h-full w-1/3 items-center justify-center bg-white"> 
        </div>

        {/* Contenedor del formulario */}
            <div className="w-full lg:w-2/3">
                <div className="flex flex-col h-full">
                    <h2 className=' mt-5 text-white text-xl font-bold text-center mb-2'>Personal Information</h2>

                    <div className="ml-5 mr-5">
                    <label className="text-white block text-sm font-medium mb-2 w-90">First Name:</label>
                    <input
                        type="text"
                        name = "firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your First Name'
                    />

                    </div>

                    <div className="ml-5  mr-5 grid grid-cols-2 gap-2 mt-2">
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Last Name:</label>
                        <input
                        type="text"
                        name = "lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your Last Name'
                        />
                    
                    </div>
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Second Last Name:</label>
                        <input
                        type="text"
                        name = "secondLastName"
                        value={formData.secondLastName}
                        onChange={handleInputChange}
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your Second Last Name'
                        />
                    
                    </div>
                    </div>

                    <div className="ml-5  mr-5 grid grid-cols-3 gap-2 mt-2">
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Phone:</label>
                        <input
                        type="text"
                        name = "phone"
                        value={formData.phonel}
                        onChange={handleInputChange}
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your Phone'
                        />
                  
                    </div>
                    
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">ISO Code:</label>
                        <select
                         name = "isoCode"
                         value={formData.isoCode}
                         onChange={handleInputChange}
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        >
                        <option value="iso1">Select an ISO</option>
                        <option value="iso1">ISO 1</option>
                        <option value="iso2">ISO 2</option>
                        <option value="iso3">ISO 3</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">DIAL Code:</label>
                        <select
                         name = "dialCode"
                         value={formData.dialCode}
                         onChange={handleInputChange}
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        >
                        <option value="dial0">Select a DIAL</option>   
                        <option value="dial1">DIAL 1</option>
                        <option value="dial2">DIAL 2</option>
                        <option value="dial3">DIAL 3</option>
                        </select>
                    </div>
                    
                    </div>

                    <div className=" mr-5 ml-5 grid grid-cols-2 gap-2 mt-2">

                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Gender:</label>
                        <select
                         name = "gender"
                         value={formData.gender}
                         onChange={handleInputChange}
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        >
                        <option value="gender0">Select a gender</option>
                        <option value="gender1">male</option>
                        <option value="gender2">female</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Profile:</label>
                        <select
                         name = "profile"
                         value={formData.profile}
                         onChange={handleInputChange}
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        >
                        <option value="profile0">Select a profile</option>
                        <option value="profile1">admin</option>
                        <option value="profile2">user</option>
                        </select>
                    </div>
                    </div>

                    <h2 className='text-white text-x font-bold text-center mt-8'>Account Information</h2>

                    <div className='ml-5  mr-5'>
                        
                    <label className="text-white block text-sm font-medium mb-2">Username:</label>
                    <input
                        name = "username"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange}
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your username'
                    />
                     
                    </div>

                    <div className='ml-5  mr-5'>
                    <label className="text-white block text-sm font-medium mb-2">Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your email'
                    />
                    
                    </div>

                    <div className="ml-5  mr-5 grid grid-cols-2 gap-2 mt-2">

                    <div className="ml-5  mr-5 grid grid-cols-2 gap-2 mt-2">
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Password:</label>
                        <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        placeholder='Enter your password'
                        />
                    </div>
                   
                    <div>
                        <label className="text-white block text-sm font-medium mb-2">Confirm Password</label>
                        <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-2'
                        />
                       
                      
                    </div>
                    </div>
                

                        
                    </div>

                  

                 
                    

                    <button onClick={handleRegister} className="mr-5 ml-5 bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl mt-4">Register</button>

                    


                    
                </div>       
                </div>
                </div>
             

                {showError && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-xl shadow-lg">
            <p className="text-green-500 text-center">{errorMessage}</p>
            <button onClick={() => setShowError(false)} className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl">
                Close
            </button>
            </div>
        </div>
        )}



        
           
        
        </>
    )
    }

export default RegisterForm
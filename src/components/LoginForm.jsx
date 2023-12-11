import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { setJWT } from '../services/jwt'
import { BD_ACTION_POST } from '../services/master'
import Loader from './Loader'
import { Alert } from '@mui/material';

function LoginForm() {
  //State for show or hide the password
  const [showPassword, setShowPassword] = useState(false);
  const [load, setLoad] = useState(false)
  const [alert, setAlert] = useState(false)
  const navigate = useNavigate()

  //Type for show or Hide password
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  //Error Email
  const [email, setEmail] = useState("")
  const [errorEmail, setErrorEmail] = useState({
    error: false,
    message: "",
  })

  //Error Password
  const [password, setPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState({
    error: false,
    message: "",
  })

  const validateEmail = (email) => {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    return regex.test(email);
  }
  const validatePassword = (password) => {
    //Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setErrorEmail({
        error: false,
        message: "",
      });
    } else {
      setErrorEmail({
        error: true,
        message: "Formato de e-mail incorrecto"
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
        message: "Contraseña incorrecta"
      });
    }
  }

  const post_sign_in = async () => {
    setLoad(true)
    const body = {
      email: email,
      password: password
    }
    const data = await BD_ACTION_POST('auth', 'sign_in', body)
    console.log(data)
    if (!data.error) {
      setJWT(data.msg.token)
      setTimeout(() => {
        navigate('/home')
      }, 2000)
    } else {
      setLoad(false)
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 6000);
    }
  }

  return (
    <>
      <Loader load={load} />
      <div className='bg-white px-8 py-5 rounded-3xl border-2 border-gray-100 w-[50%] text-center'>
        <h1 className=' text-4xl font-semibold text-center'>Welcome Back</h1>
        <p className=" font-medium text-lg text-gray-500 mt-1">Please, enter your details</p>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <TextField
              id='email'
              label='Email'
              type="email"
              required
              variant='standard'
              fullWidth
              helperText={errorEmail.message}
              error={errorEmail.error}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mt-5'>
            <TextField
              id='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              required
              variant='standard'
              fullWidth
              helperText={errorPassword.message}
              error={errorPassword.error}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handlePasswordToggle} edge='end'>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />

          </div>

          {/* Options Buttons */}
          <div className='mt-8 flex justify-between items-center'>
            <Link className='ml-auto font-normal text-sm text-yummy-800 hover:text-red-700' to='/auth/forgot_password'>Forgot password</Link>

          </div>

          {/* Sign In Buttons */}
          <div className='mt-8 flex flex-col gap-y-4'>
            <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-yummy-800 text-white text-lg font-bold' onClick={() => { post_sign_in() }}>Sign in</button>

            <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all flex rounded-xl py-3 border-2 border-gray-300 items-center justify-center gap-2'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http:www.w3.org/2000/svg">
                <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335" />
                <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853" />
                <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2" />
                <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05" />
              </svg>
              Sign in with Google
            </button>
          </div>

        </form>
      </div>
      {
        alert && (
          <Alert severity='warning' className='absolute bottom-2 left-2 transition-all duration-300'>Your Password or Email is Incorrect, Please Try Again !</Alert>
        )
      }
    </>
  )
}

export default LoginForm
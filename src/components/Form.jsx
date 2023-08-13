import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormInput from './FormInput'
import iconEye from '../assets/icons/eye-regular.svg'
import iconEyeSlash from '../assets/icons/eye-slash-regular.svg'


function Form() {

  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); //For show or hide password

  //For show errorMessage or succesMessage
  const handleFocus = (e) => {
    setFocused(true);
  }
  //Initialize inputs values
  const [values, setValues] = useState({
    email: "",
    password: ""
  }

  );

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      errormesssage: "It's no valid email address!",
      label: "Email",
      pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
      required: true
    },
    {
      id: 2,
      name: "password",
      type: "password" || "text",
      placeholder: "Enter your password",
      errormesssage: "It's no valid password!",
      label: "Password",
      pattern: /^\d{8}$/, //Contraseña de 8 caracteres numericos *while*
      required: true,
    }
  ];

  const handleSubmit = (e) => {
    // So that the page is not reloaded when pressing the send button
    e.preventDefault();

  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div className='bg-white px-8 py-5 rounded-3xl border-2 border-gray-100'>
      <h1 className=' text-4xl font-semibold text-center'>Welcome Back</h1>
      <p className=" font-medium text-lg text-gray-500 mt-1">Welcome to Yummi Go! Please enter your details</p>

      <form className="mt-4" onSubmit={handleSubmit}>

        {inputs.map((input) => (
          <div key={input.id}>
            <div className="relative">
              <FormInput
                {...input}
                value={values[input.name]}
                onChange={onChange}
                required={input.required}
                onBlur={handleFocus}
                focused={focused.toString()}
                type={input.name === 'password' ? (showPassword ? 'text' : 'password') : input.type}
              />
              {input.name === 'password' && (
                <button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <div className='mt-6'>
                    <img
                      src={showPassword ? iconEyeSlash : iconEye}
                      alt={showPassword ? 'icon-eye-slash' : 'icon-eye'}
                      className="w-8 h-5"
                    />
                  </div>

                </button>
              )}
            </div>
            {/* //Messages */}
            {input.name === "email" && input.required && values[input.name] === "" && focused && (
              <span className='text-red-600 text-sm'>{input.errormesssage}</span>
            )}
            {input.required && values[input.name] !== "" && input.pattern && !input.pattern.test(values[input.name]) && focused && (
              <span className='text-red-600 text-sm'>{input.errormesssage}</span>
            )}
            {input.pattern && input.pattern.test(values[input.name]) && (
              <span className='text-green-600 text-sm'>
                {input.name === "email" ? "Email correct!" : "Password correct!"}
              </span>
            )}
          </div>
        ))}

        {/* Options Buttons */}
        <div className='mt-8 flex justify-between items-center'>
          <div>
            <button className='ml-2 font-medium text-base text-yummy-800 hover:text-red-700'>Sign up</button>
          </div>
          <Link className='font-medium text-base text-yummy-800 hover:text-red-700' to='/auth/forgot_password'>Forgot password</Link>
        </div>

        {/* Sign In Buttons */}
        <div className='mt-8 flex flex-col gap-y-4'>
          <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-yummy-800 text-white text-lg font-bold'>Sign in</button>

          <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all flex rounded-xl py-3 border-2 border-gray-300 items-center justify-center gap-2'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  )
}

export default Form
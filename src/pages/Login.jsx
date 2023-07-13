import { Route, Routes } from 'react-router-dom'
import Form from '../components/Form'
import yumiLogo from '../assets/images/LogoYumi.jpg'


function Login() {
    return (
        <>
            <div className="bg-yumi flex w-full h-screen">

            {/* Contenedor del formulario */}
            <div className=" w-full flex items-center justify-center lg:w-1/2">
              <Form></Form>
            </div>

            {/* Contenedor de la animacion */}
            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white" >
              <img src={yumiLogo} alt="YumiLogo" className="animate-pulse animate-infinite" />
            </div>

            <Routes>
                    <Route path='/Form' element={<Form />} />
            </Routes>

          </div>
        </>
    )
}

export default Login

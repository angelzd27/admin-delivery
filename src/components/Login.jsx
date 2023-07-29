import Form from './Form'
import yumiLogo from '../assets/images/Yummy1.jpg'


function Login() {
  return (
    <>
      <div className="bg-yummy-800 flex w-full h-screen">

        {/* Contenedor del formulario */}
        <div className=" w-full flex items-center justify-center lg:w-1/2">
          <Form></Form>
        </div>

        {/* Contenedor de la animacion */}
        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white" >
          <img src={yumiLogo} alt="YumiLogo" className="animate-pulse animate-infinite" />
        </div>

      </div>
    </>
  )
}

export default Login

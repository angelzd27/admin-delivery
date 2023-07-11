import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import yumiLogo from './assets/images/LogoYumi.jpg'

// const router = createBrowserRouter([
//   {
//     path: '/home',
//     element: <Home />,
//     children: [
//       {
//         path: 'hell',
//         element: <Hell />
//       }
//     ]
//   }
// ])

function App() {
  return (
    <>
      <div className="bg-yumi flex w-full h-screen">

        {/* Contenedor del formulario */}
        <div className=" w-full flex items-center justify-center lg:w-1/2">
          <Login></Login>
        </div>

        {/* Contenedor de la animacion */}
        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white" >
          <img src={yumiLogo} alt="YumiLogo" className="animate-pulse animate-infinite" />
        </div>

      </div>

    </>
  )
}

export default App

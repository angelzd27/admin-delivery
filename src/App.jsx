import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Auth from './pages/Auth'
import { Is_Expired_JWT, Data_JWT } from './services/jwt'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    Is_Expired_JWT().then(data => console.log(data))
  })

  return (
    <>
      {
        Is_Expired_JWT() ? (
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Navigate to='/auth' />} />
              <Route path='/auth/*' element={<Auth />} />
              <Route path='/home/*' element={<Home />} />
              <Route path='/not-found' element={<NotFound />} />
              <Route path='/*' element={<Navigate to='/not-found' />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/auth/*' element={<Auth />} />
              <Route path='/not-found' element={<NotFound />} />
              <Route path='/*' element={<Navigate to='/not-found' />} />
            </Routes>
          </BrowserRouter>
        )
      }
    </>
  )
}

export default App
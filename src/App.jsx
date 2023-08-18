import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Auth from './pages/Auth'
import { expiredJWT, getJWT } from './services/jwt'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={expiredJWT() ? <Navigate to='/home' /> : <Navigate to='/auth' />} />
          <Route path='/home/*' element={expiredJWT() ? <Home /> : <Navigate to='/auth' />} />
          <Route path='/auth/*' element={<Auth />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/*' element={<Navigate to='/not-found' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
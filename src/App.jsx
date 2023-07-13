import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/home/*' element={<Home />} />
          <Route path='/not-found' element={<h1>Not Found is Work!</h1>} />
          <Route path='/*' element={<Navigate to='/not-found' />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

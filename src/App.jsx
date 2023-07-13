import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<h1>Login is Work!</h1>} />
          <Route path='/home/*' element={<Home />} />
          <Route path='/not-found' element={<h1>Not Found is Work!</h1>} />
          <Route path='/*' element={<Navigate to='/not-found' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Auth from './pages/Auth'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home/*' element={<Home />} />
          <Route path='/auth/*' element={<Auth />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/*' element={<Navigate to='/not-found' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
import Sidebar from '../components/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import Settings from '../components/Settings'
import NotFound from './NotFound'
import RegisterForm from '../components/RegisterForm'
import ForgotPassword from '../components/ForgotPassword'

function Home() {
    return (
        <>
            <div className='grid grid-cols-6 min-h-screen overflow-y-scroll'>
                <Sidebar />
                <Routes>
                    <Route path='/' element={<Navigate to='/home/dashboard' />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/settings' element={<Settings />} />                  
                    <Route path='/*' element={<NotFound />} />
                </Routes>
            </div>

        </>
      
    )
}

export default Home

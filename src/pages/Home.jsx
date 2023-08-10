import Sidebar from '../components/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import Settings from '../components/Settings'
import Dishes from '../components/Dishes'

function Home() {
    return (
        <>
            <div className='grid grid-cols-6 min-h-screen overflow-y-scroll bg-slate-50'>
                <Sidebar />
                <div className='mt-10 col-span-6 lg:col-span-5 mr-[4.5%]'>
                    <Routes>
                        <Route path='/' element={<Navigate to='/home/dashboard' />} />
                        <Route path='/dishes' element={<Dishes />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/settings' element={<Settings />} />
                        <Route path='/*' element={<Navigate to='/not-found' />} />
                    </Routes>
                </div>
            </div>
        </>

    )
}

export default Home

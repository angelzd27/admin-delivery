import Sidebar from '../components/Sidebar'
import { Route, Routes } from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import Settings from '../components/Settings'

function Home() {
    return (
        <>
            <div className='grid grid-cols-6 min-h-screen overflow-y-scroll'>
                <Sidebar />
                <Routes>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </div>
        </>
    )
}

export default Home

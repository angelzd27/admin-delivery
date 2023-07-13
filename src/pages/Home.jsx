import Sidebar from '../components/Sidebar'
import { Route, Routes } from 'react-router-dom'

import Dashboard from '../components/Dashboard'

function Home() {
    return (
        <>
            <div className='grid grid-cols-6 min-h-screen overflow-y-scroll'>
                <Sidebar />
                <Routes>
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </div>
        </>
    )
}

export default Home

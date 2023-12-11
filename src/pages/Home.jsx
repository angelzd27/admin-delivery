import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'
import MyProfile from '../components/MyProfile'
import Dishes from '../components/Dishes'
import Categories from '../components/Categories'
import ProductDetail from '../components/ProductDetail'
import SignUp from '../components/SignUp'
import { expiredJWT } from '../services/jwt'
import Tickets from '../components/Tickets'

function Home() {
    return (
        <>
            {
                !expiredJWT() ? (
                    <div className='grid grid-cols-6 min-h-screen overflow-y-scroll bg-slate-50'>
                        <Sidebar />
                        <div className='mt-10 col-span-6 xl:col-span-5 xl:col-start-2 xl:mr-[1rem] mx-3 mb-24'>
                            <Routes>
                                <Route path='/' element={<Navigate to='/home/dashboard' />} />
                                <Route path='/dashboard' Component={Dashboard} />
                                <Route path='/dishes' Component={Dishes} />
                                <Route path='/product-detail/:id' Component={ProductDetail} />
                                <Route path='/product-add' Component={ProductDetail} />
                                <Route path='/categories' Component={Categories} />
                                <Route path='/tickets' Component={Tickets} />
                                <Route path='/my_profile' Component={MyProfile} />
                                <Route path='/*' element={<Navigate to='/not-found' />} />
                            </Routes>
                        </div>
                    </div>
                ) : (
                    <Navigate to='/auth/sign_in' />
                )
            }
        </>
    )
}

export default Home

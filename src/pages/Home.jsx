import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'
import MyProfile from '../components/MyProfile'
import Dishes from '../components/Dishes'
import Categories from '../components/Categories'
import ProductDetail from '../components/ProductDetail'
import SignUp from '../components/SignUp'
import Users from '../components/Users'
import { expiredJWT } from '../services/jwt'

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
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='/dishes' element={<Dishes />} />
                                <Route path='/product-detail/:id' element={<ProductDetail />} />
                                <Route path='/product-add' element={<ProductDetail />} />
                                <Route path='/sign_up' element={<SignUp />} />
                                <Route path='/categories' element={<Categories />} />
                                <Route path='/my_profile' element={<MyProfile />} />
                                <Route path='/users' element={<Users />} />
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

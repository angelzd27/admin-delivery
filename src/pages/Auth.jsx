import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../components/Login'
import ForgotPassword from '../components/ForgotPassword'
import RegisterForm from '../components/RegisterForm'
import { expiredJWT } from '../services/jwt'

export default function Auth() {
    useEffect(() => {
        console.log(!expiredJWT())
    }, [])

    return (
        <>
            <Routes>
                <Route path='/' element={<Navigate to='/auth/sign_in' />} />
                <Route path='/sign_in' element={<Login />} />
                <Route path='/forgot_password' element={<ForgotPassword />} />
                <Route path='/sign_up' element={<RegisterForm />} />
                <Route path='/*' element={<Navigate to='/not-found' />} />
            </Routes>
        </>
    )
}
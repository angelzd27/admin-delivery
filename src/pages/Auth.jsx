import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from '../components/Login'
import ForgotPassword from '../components/ForgotPassword'
import RegisterForm from '../components/RegisterForm'
import { useEffect } from 'react'
import { expiredJWT, getJWT } from '../services/jwt'
import Loader from '../components/Loader'

export default function Auth() {
    const navigate = useNavigate()

    useEffect(() => {
        if (getJWT() != '' && !expiredJWT()) {
            navigate('/home/dashboard')
        }
    })

    return (
        <>
            <Loader load={true} />
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
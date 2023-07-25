import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './Login'
import ForgotPassword from '../components/ForgotPassword'
import CodePassword from '../components/CodePassword'
import SetPassword from '../components/SetPassword'

export default function Auth() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Navigate to='/auth/sign_in' />} />
                <Route path='/sign_in' element={<Login />} />
                <Route path='/forgot_password' element={<ForgotPassword />} />
                <Route path='/email_code' element={<CodePassword />} />
                <Route path='/set_password' element={<SetPassword />} />
                <Route path='/*' element={<Navigate to='/not-found' />} />
            </Routes>
        </>
    )
}
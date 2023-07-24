import { Routes, Route } from 'react-router-dom';
import Login from './Login'
import ForgotPassword from '../components/ForgotPassword';

export default function Auth(){
    return (
        <>
            <Routes>
                <Route path='/sign_in' element={<Login />} />
                <Route path='/forgot_password' element={ <ForgotPassword />}/>
            </Routes>
        </>
    )
}
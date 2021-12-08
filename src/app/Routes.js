import { Routes, Route } from 'react-router-dom';
import LoginForm from '../features/auth/LoginForm';
import SignupForm from '../features/auth/SignupForm';
import Home from '../app/home';
import NotFound from '../app/NotFound';
import Profile from '../features/users/Profile';
import Instruments from '../features/instruments/Instruments';

const Routing = () => {
    return (
        <Routes>
            <Route path='/instruments' element={<Instruments/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/login' element={<LoginForm/>} />
            <Route path='/signup' element={<SignupForm/>} />
            <Route path='/' element={<Home/>} />
            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

export default Routing;
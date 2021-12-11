import { Routes, Route } from 'react-router-dom';
import SignupForm from '../features/users/SignupForm';
import Home from './Home';
import NotFound from '../app/NotFound';
import Profile from '../features/users/Profile';
import Instruments from '../features/instruments/Instruments';
import InstrumentPage from '../features/instruments/InstrumentPage';

const Routing = () => {
    return (
        <Routes>
            <Route path='/instruments/:instId' element={<InstrumentPage/>} />
            <Route path='/instruments' element={<Instruments/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/signup' element={<SignupForm/>} />
            <Route path='/' element={<Home/>} />
            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

export default Routing;
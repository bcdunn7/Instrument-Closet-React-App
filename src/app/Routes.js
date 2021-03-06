import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignupForm from '../features/users/SignupForm';
import Home from './Home';
import NotFound from '../app/NotFound';
import Profile from '../features/users/Profile';
import Instruments from '../features/instruments/Instruments';
import InstrumentPage from '../features/instruments/InstrumentPage';
import MyReservationsPage from '../features/instruments/MyReservationsPage';
import EditReservationForm from '../features/instruments/EditReservationForm';

const Routing = () => {
    const token = useSelector(state => state.user.token);

    return (
        <Routes>
            <Route path='/instruments/:instId' element={
                token ? <InstrumentPage/> : <Navigate to='/' />
            } />
            <Route path='/instruments' element={
                token ? <Instruments/> : <Navigate to='/' />
            } />
            <Route path='/reservations/:resvId' element={
                token ? <EditReservationForm/> : <Navigate to='/' />
            } />
            <Route path='/reservations' element={
                token ? <MyReservationsPage/> : <Navigate to='/' />
            }/>
            <Route path='/profile' element={
                token ? <Profile/> : <Navigate to='/' />
            } />
            <Route path='/signup' element={
                token ? <Navigate to='/' /> : <SignupForm/>
            } />
            <Route path='/' element={<Home/>} />
            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

export default Routing;
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReservationCard from './ReservationCard';
import './MyReservationPage.css';
import { useEffect } from 'react';
import ClosetAPI from '../../services/api';

const MyReservations = () => {
    const userData = useSelector(state => state.user.userData);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        async function getUserReservations(username) {
            let resp = await ClosetAPI.getUserReservations(username);
            console.log(resp);
            setReservations(resp.reservations);
        }

        getUserReservations(userData.username);
    }, [userData.username])

    return (
        <div className='MyReservationsPage'>
            <h3>Reservations for {userData.username}</h3>
            <div className='MyReservationsPage-container'>
                {reservations.map(r => <ReservationCard resvData={r}/>)}
            </div>
        </div>
    )
}
// need to display user reservations with all relevant details fully visible, with an 'edit reservation' button for each. Edit should be able to change every small detail (times, timezone, quantity, etc.) I think we can reuse the form to create reservations if we want since it will be the same info. Logically, it's equivalent to deleting a reservation and editing it again. 
// The only tricky part will be on quantity. When we make a call to see what quantity is or is not available we will need to SUBTRACT the original quantity from the reservation being edited. Since it won't matter once edited.

export default MyReservations;
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReservationCard from './ReservationCard';
import './MyReservationPage.css';
import { useEffect } from 'react';
import ClosetAPI from '../../services/api';
import { Snackbar } from '@mui/material';

const MyReservations = () => {
    const userData = useSelector(state => state.user.userData);
    const [reservations, setReservations] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState(false);

    useEffect(() => {
        async function getUserReservations(username) {
            let resp = await ClosetAPI.getUserReservations(username);
            setReservations(resp.reservations);
        }

        if (userData.username) getUserReservations(userData.username);
    }, [userData.username, deleteMessage])

    const handleDeleteClick = async (e) => {
        e.preventDefault();
        let id = null;
        if (!e.target.dataset.resvid) {
            id = e.target.parentElement.dataset.resvid;
        } else {
            id = e.target.dataset.resvid;
        }
        await ClosetAPI.deleteReservation(id);
        setDeleteMessage(true);
    }

    const handleSnackbarClose = () => {
        setDeleteMessage(false);
    }

    return (
        <>
            {deleteMessage 
                ? <Snackbar 
                    open={deleteMessage}
                    autoHideDuration={6000}
                    message='Reservation Deleted'
                    onClose={handleSnackbarClose}
                />
                : null
            }
            <div className='MyReservationsPage'>
                <h3>Reservations for {userData.username}</h3>
                <div className='MyReservationsPage-container'>
                    {reservations.length > 0 
                        ? <>
                            {reservations.map(r => <ReservationCard resvData={r} key={r.id} handleDeleteClick={handleDeleteClick}/>)}
                        </>
                        : <p>Doesn't look like you've made any reservations yet. Head to the Instrument List tab to make a reservation.</p>
                    }
                </div>
            </div>
        </>
    )
}
// need to display user reservations with all relevant details fully visible, with an 'edit reservation' button for each. Edit should be able to change every small detail (times, timezone, quantity, etc.) I think we can reuse the form to create reservations if we want since it will be the same info. Logically, it's equivalent to deleting a reservation and editing it again. 
// The only tricky part will be on quantity. When we make a call to see what quantity is or is not available we will need to SUBTRACT the original quantity from the reservation being edited. Since it won't matter once edited.

export default MyReservations;
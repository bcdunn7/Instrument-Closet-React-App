import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ClosetAPI from "../../services/api";

const EditReservationForm = () => {
    const [reservation, setReservation] = useState();
    const userId = useSelector(state => state.user.userData.id);

    const { resvId } = useParams();

    useEffect(() => {
        async function getReservation(id) {
            let resp = await ClosetAPI.getReservation(id);
            setReservation(resp.reservation);
        }
        if (userId) {
            getReservation(resvId);
        }
    }, [resvId, userId])

    if (!reservation) return (<p>Loading...</p>);

    return (
        <div>
            Details: {reservation.id}
        </div>   
    )
}

export default EditReservationForm;
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInstrumentReservations } from './instrumentsSlice';
import Calendar from './Calendar';
import ReservationForm from './ReservationForm';

const InstrumentPage = () => {
    const dispatch = useDispatch();
    const { instId } = useParams();
    const user = useSelector(state => state.user.userData)
    const inst = useSelector(state => state.instruments.entities.filter(i => i.id.toString() === instId)[0]);
    const instReservations = useSelector(state => state.instruments.currInstrument.reservations);
    const [formattedReservations, setFormattedReservations] = useState([]);

    useEffect(() => {
        if (instReservations) {
            setFormattedReservations(instReservations.map(r => ({
                start: parseInt(r.startTime + '000'),
                end: parseInt(r.endTime + '000'),
                id: r.id,
                title: r.userId === user.id ? `${r.quantity} Reserved by Me!` : `${r.quantity} Reserved`,
                backgroundColor: r.userId === user.id ? '#81b9bf' : '#005662',
                borderColor: r.userId === user.id ? '#81b9bf' : '#005662'
            })))
        }
    }, [instReservations])

    useEffect(() => {
        dispatch(getInstrumentReservations(instId))
    }, [dispatch, instId])


    const addReservation = (newResv) => {
        setFormattedReservations([...formattedReservations, {
            start: parseInt(`${newResv.startTime}000`),
            end: parseInt(`${newResv.endTime}000`),
            id: newResv.id,
            title: `${newResv.quantity} Reserved`
        }]);
        dispatch(getInstrumentReservations(instId));
    }

    return (
        <>
            {inst 
                ? <>
                    <div>name: {inst.name}</div>
                    <div>quan: {inst.quantity}</div>
                    <ReservationForm 
                        instId={inst.id} 
                        instName={inst.name} 
                        instQuantity={inst.quantity} 
                        instReservations={instReservations}
                        addReservation={addReservation}    
                    />
                    <Calendar
                        events={formattedReservations}
                    />
                </>
                : <div>Sorry, couldn't find that instrument :/ It's possible the instruments aren't loaded yet, head to instrument list</div>
            }
        </>
    )
}

export default InstrumentPage;
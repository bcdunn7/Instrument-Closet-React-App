import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInstrumentReservations } from './instrumentsSlice';

const InstrumentPage = () => {
    const dispatch = useDispatch();
    const { instId } = useParams();
    const inst = useSelector(state => state.instruments.entities.filter(i => i.id.toString() === instId)[0]);
    const instReservations = useSelector(state => state.instruments.currInstrument.reservations);
    
    const currAvail = inst.quantity - instReservations.reduce((sum, next) => {
        return sum += next.quantity
    }, 0);

    useEffect(() => {
        dispatch(getInstrumentReservations(instId))
    }, [dispatch, instId])

    return (
        <>
            <div>name: {inst.name}</div>
            <div>quan: {inst.quantity}</div>
            <div>avail: {currAvail ? currAvail : inst.quantity}</div>
        </>
    )
}

export default InstrumentPage;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "../../app/ErrorAlert";
import ClosetAPI from "../../services/api";
import './EditReservationForm.css';
import { DateTime } from "luxon";
import { useDispatch } from "react-redux";
import { getInstrumentReservations } from './instrumentsSlice';
import { Slider, TextField, Button } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LoadingButton from '@mui/lab/LoadingButton';

import TimezoneSelect from "react-timezone-select/dist";


const EditReservationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [reservation, setReservation] = useState();
    const [instrument, setInstrument] = useState();
    const [reservedAtTargetTime, setReservedAtTargetTime] = useState(0);
    const [loading, setLoading] = useState(false);
    const [instQuantity, setInstQuantity] = useState(null);

    // Form State
    const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');
    const [startTime, setStartTime] = useState(DateTime.now().startOf('hour').plus({ hours: 1}));
    const [endTime, setEndTime] = useState(DateTime.now().startOf('hour').plus({ hours: 3}));

    const userId = useSelector(state => state.user.userData.id);
    const resvError = useSelector(state => state.instruments.resvError);
    const instReservations = useSelector(state => state.instruments.currInstrument.reservations);

    const { resvId } = useParams();

    useEffect(() => {
        async function getReservationAndInstrument(id) {
            let resvResp = await ClosetAPI.getReservation(id);
            setReservation(resvResp.reservation);
            setQuantity(resvResp.reservation.quantity);
            setNotes(resvResp.reservation.notes);
            setStartTime(DateTime.fromSeconds(resvResp.reservation.startTime));
            setEndTime(DateTime.fromSeconds(resvResp.reservation.endTime));

            let instResp = await ClosetAPI.getInstrument(resvResp.reservation.instrumentId);
            setInstrument(instResp.instrument);
            setInstQuantity(instResp.instrument.quantity);

            dispatch(getInstrumentReservations(instResp.instrument.id));
        }
        if (userId) {
            getReservationAndInstrument(resvId);
        }
    }, [userId, dispatch, resvId])

    useEffect(() => {
        setLoading(true);
        if (instReservations && reservation) {
            const unixStart = startTime.setZone(timeZone.value, { keepLocalTime: true }).toSeconds();
            const unixEnd = endTime.setZone(timeZone.value, { keepLocalTime: true }).toSeconds();
            
            const initialReserved = instReservations.reduce((sum, next) => {
                if ((next.startTime < unixEnd && next.startTime >= unixStart) || (next.endTime > unixStart && next.endTime <= unixEnd)) {
                    return sum + next.quantity;
                } else return sum; 
            }, 0)

            setReservedAtTargetTime(initialReserved-reservation.quantity);
        }

        if (quantity > instQuantity-reservedAtTargetTime) setLoading(true);
        else if (endTime <= startTime) setLoading(true);
        else if (startTime < DateTime.now() || endTime < DateTime.now()) setLoading(true);

        else setLoading(false);
    }, [quantity, instQuantity, startTime, endTime, timeZone, instReservations, reservedAtTargetTime, loading, reservation])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const patchData = {
            quantity: quantity,
            startTime: startTime.toFormat("yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
            endTime: endTime.toFormat("yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
            timeZone: timeZone,
            notes: notes
        }

        try {
            await ClosetAPI.patchReservation(reservation.id, patchData);
            navigate('/reservations');
        } catch (e) {
            console.error(e);
            dispatch({ type: 'instruments/reservationError', payload: e[0].data.error })
        }
    } 

    if (!reservation || !instrument) return (<p>Loading...</p>);

    return (
        <>
            {resvError
                ? <ErrorAlert error={resvError} dispAction='instruments/clearError' />
                : null
            }
            <div className="EditReservationForm">
                <h3 className="EditReservationForm-heading">Edit Reservation</h3>
                <form onSubmit={handleSubmit}>
                    <div className="EditReservationForm-content">
                        {instQuantity > 1
                            ? <>
                                <div>
                                    <b>Quantity: {quantity}</b>
                                    <br/>
                                    <span className={quantity > instQuantity-reservedAtTargetTime ? 'EditReservationForm-validation-error' : null}>
                                            (Available at Desired Time: {instQuantity-reservedAtTargetTime})
                                    </span>
                                </div>
                                <div className="EditReservationForm-slider-div">
                                    <Slider
                                        aria-label='Quantity'
                                        value={quantity}
                                        step={1}
                                        marks
                                        min={1}
                                        max={instQuantity}
                                        valueLabelDisplay='auto'
                                        color='secondary'
                                        onChange={(e, newQuantity) => setQuantity(newQuantity)}
                                    />
                                </div>
                            </>
                            : <div className="EditReservationForm-validation-error">
                                {reservedAtTargetTime > 0
                                    ? 'Not Available at Desired Time'
                                    : null
                                }
                            </div>
                        }
                        <TextField
                            className='EditReservationForm-notes'
                            label='Notes'
                            multiline
                            maxRows={6}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            color='secondaryDarker'
                        />
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <div className="EditReservationForm-DateTimePicker-div">
                                <DateTimePicker
                                    renderInput={(props) => <TextField color='secondaryDarker' {...props} />}
                                    label='Start Time'
                                    value={startTime}
                                    onChange={(newStartTime) => {setStartTime(newStartTime);}}
                                    views={['year', 'month', 'day', 'hours']}
                                    minutesStep={60}
                                    color='primaryDark'
                                />
                            </div>
                            <div className='ReservationForm-DateTimePicker-div'>
                                <DateTimePicker
                                    className='ReservationForm-DateTimePicker'
                                    renderInput={(props) => <TextField color='secondaryDarker' {...props} />}
                                    label="End Time"
                                    value={endTime}
                                    onChange={(newEndTime) => {
                                        setEndTime(newEndTime);
                                    }}
                                    views={['year','month','day','hours']}
                                    minutesStep={60}
                                />
                            </div>
                        </LocalizationProvider>
                        <div className='ReservationForm-validation-error'>
                            {startTime < DateTime.now() || endTime < DateTime.now() ? 'Cannot make a reservation in the past' : endTime <= startTime ? 'End Time must be later than Start' : ' '}
                        </div>
                        <div className="EditReservationForm-timezone-wrapper">
                            <TimezoneSelect
                                value={timeZone}
                                onChange={(newTimeZone) => setTimeZone(newTimeZone.value)}
                            />
                        </div>
                    </div>
                    <div className="EditReservationForm-btns-div">
                        <Button onClick={() => navigate('/reservations')} variant='outlined' color='warning'>
                            Go Back
                        </Button>
                        <LoadingButton type='submit' variant='outlined' color='secondaryDarker' loading={loading}>
                            Save Changes
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </> 
    )
}

export default EditReservationForm;
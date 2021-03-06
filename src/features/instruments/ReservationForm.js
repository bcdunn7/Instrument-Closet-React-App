import { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { DateTime } from 'luxon';
import TimezoneSelect from 'react-timezone-select';
import './ReservationForm.css';
import ClosetAPI from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import ErrorAlert from '../../app/ErrorAlert';
import createFreqCounter from '../../services/frequencyCounter';

const ReservationForm = ({ instId, instName, instQuantity, addReservation }) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData);
    const resvError = useSelector(state => state.instruments.resvError);
    const instReservations = useSelector(state => state.instruments.currInstrument.reservations);
    const [open, setOpen] = useState(false);
    const [startTime, setStartTime] = useState(DateTime.now().startOf('hour').plus({ hours: 1 }));
    const [endTime, setEndTime] = useState(DateTime.now().startOf('hour').plus({ hours: 3 }));
    const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');
    const [reservedAtTargetTime, setReservedAtTargetTime] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (instReservations) {
            const unixStart = startTime.setZone(timeZone.value, { keepLocalTime: true }).toSeconds();
            const unixEnd = endTime.setZone(timeZone.value, { keepLocalTime: true }).toSeconds();

            setReservedAtTargetTime(() => {
                const resvFreqs = createFreqCounter(instReservations);

                let maxResvQuantity = 0;

                let start = unixStart;

                while (start < unixEnd) {
                    let currResvQuantity = resvFreqs[start];
                    if (currResvQuantity > maxResvQuantity) {
                        maxResvQuantity = currResvQuantity
                    }

                    // 3600 is the number of seconds in an hour, which is the current granularity allowed of reservations
                    start += 3600;
                }

                return maxResvQuantity;
            })
        }

        if (quantity > instQuantity - reservedAtTargetTime) setLoading(true);
        else if (endTime <= startTime) setLoading(true);
        else if (startTime < DateTime.now() || endTime < DateTime.now()) setLoading(true);

        else setLoading(false);
    }, [quantity, instQuantity, startTime, endTime, timeZone, instReservations, reservedAtTargetTime, loading])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resvData = {
            userId: userData.id,
            instrumentId: instId,
            quantity: quantity,
            startTime: startTime.toFormat("yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
            endTime: endTime.toFormat("yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
            timeZone: timeZone,
            notes: notes
        }

        try {
            const resp = await ClosetAPI.createReservation(resvData);
            addReservation(resp.reservation);
            setOpen(false);
            setStartTime(DateTime.now().startOf('hour').plus({ hours: 1 }));
            setEndTime(DateTime.now().startOf('hour').plus({ hours: 3 }));
            setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
            setQuantity(1);
            setNotes('');
        } catch (e) {
            console.error(e);
            dispatch({ type: 'instruments/reservationError', payload: e[0].data.error })
        }
    }

    return (
        <>
            {resvError
                ? <ErrorAlert error={resvError} dispAction='instruments/clearError' />
                : null
            }
            <div className='ReservationForm'>
                <Button onClick={handleClickOpen} variant='outlined' color='primaryDark'>Make A Reservation</Button>
                <Dialog
                    className='ReservationForm-dialog'
                    open={open}
                    onClose={handleClose}
                    fullWidth={true}
                    maxWidth='lg'
                >
                    <div className='ReservationForm-dialog-div'>
                        <DialogTitle className='ReservationForm-dialog-title'>Reserve {instName}</DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent className='ReservationForm-dialog-content'>
                                {resvError ? <ErrorAlert error={resvError} /> : null}
                                {instQuantity > 1
                                    ? <>
                                        <DialogContentText>
                                            <b>Quantity: {quantity}</b>
                                            <br />
                                            <span className={quantity > instQuantity - reservedAtTargetTime ? 'ReservationForm-validation-error' : null}>
                                                (Available at Desired Time: {instQuantity - reservedAtTargetTime})
                                            </span>
                                        </DialogContentText>
                                        <div className='ReservationForm-slider-div'>
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
                                    : <div className='ReservationForm-validation-error'>
                                        {reservedAtTargetTime > 0
                                            ? 'Not Available at Desired Time'
                                            : null
                                        }
                                    </div>
                                }
                                <TextField
                                    className='ReservationForm-notes'
                                    label='Notes'
                                    multiline
                                    maxRows={6}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    color='secondaryDarker'
                                />
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <div className='ReservationForm-DateTimePicker-div'>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField color='secondaryDarker' {...props} />}
                                            label="Start Time"
                                            value={startTime}
                                            onChange={(newStartTime) => {
                                                setStartTime(newStartTime);
                                            }}
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
                                            views={['year', 'month', 'day', 'hours']}
                                            minutesStep={60}
                                        />
                                    </div>
                                </LocalizationProvider>
                                <div className='ReservationForm-validation-error'>
                                    {startTime < DateTime.now() || endTime < DateTime.now() ? 'Cannot make a reservation in the past' : endTime <= startTime ? 'End Time must be later than Start' : ' '}
                                </div>
                                <div className='ReservationForm-timezone-wrapper'>
                                    <TimezoneSelect
                                        value={timeZone}
                                        onChange={(newTimeZone) => setTimeZone(newTimeZone.value)}
                                    />
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color='warning'>Cancel</Button>
                                <LoadingButton type='submit' variant='outlined' color='secondaryDarker' loading={loading}>Reserve</LoadingButton>
                            </DialogActions>
                        </form>
                    </div>
                </Dialog>
            </div>
        </>
    )
}

export default ReservationForm;
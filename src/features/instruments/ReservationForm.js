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
import { useSelector } from 'react-redux';

const ReservationForm = ({ instId, instName, instQuantity, instReservations }) => {
    const [open, setOpen] = useState(false);
    const [startTime, setStartTime] = useState(DateTime.now().startOf('hour').plus({ hours: 1}));
    const [endTime, setEndTime] = useState(DateTime.now().startOf('hour').plus({ hours: 3}));
    const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');
    const [reservedAtTargetTime, setReservedAtTargetTime] = useState(0);
    const [loading, setLoading] = useState(false);
    // need to get user id via useSelector in redux. Is that in the store yet? It might just be token I'm afraid. I need to get user info anyways, so it will be in the store eventually. So don't bring in token and parse. Instead, just grab userId from store which will be in there (just not yet).
    // const user = useSelector(state => state.user)


    useEffect(() => {
        setLoading(true);
        const unixStart = startTime.setZone(timeZone.value, { keepLocalTime: true }).toSeconds();
        const unixEnd = endTime.setZone(timeZone.value, { keepLocalTime: true }).toSeconds();

        setReservedAtTargetTime(instReservations.reduce((sum, next) => {
            if ((next.startTime < unixEnd && next.startTime > unixStart) || (next.endTime > unixStart && next.endTime < unixEnd)) {
                return sum + next.quantity;
            } else return sum;
        }, 0))

        setLoading(false);
    }, [startTime, endTime, timeZone, instReservations, reservedAtTargetTime, loading])

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSubmit = async (e) => {
        // e.preventDefault();
        // console.log('submit')
        // // construct object to pass to ClosetAPI
        // const resvData = {
        //     userId: null,
        //     instrumentId: instId,
        //     quantity: quantity,
        //     // need to convert times and timezone to ISO8601 and IANA
        //     // I think it is already luxon obj so just use methods to convert. I think it is just timeZone.value to get the IANA
        //     startTime: null,
        //     endTime: null,
        //     //I think this is right but might need to check
        //     timeZone: timeZone.value,
        //     notes: notes
        // }

        // //trycatch? Does this need/should be redux dispatch?
        // // redux docs say use it as much or little as is helpful so unless I am updating global state, I do not need to. I don't think I'm updating global state. So far, am not storing resvs in redux store at all, not sure why I would start now. 
        // const resp = await ClosetAPI.createReservation(resvData)

        //then need to clean up 
        // if error, then display error message somewhere, probably do NOT redirect or clear form so they can just make a change and resubmit
        // if success, redirct to instruments or instruments/instId probably. Or if there is a reservation/resvId page, then that
    }

    return (
        <div className='ReservationForm'>
            <Button onClick={handleClickOpen} variant='outlined' color='primaryDark'>Reserve This Instrument</Button>
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
                            {instQuantity > 1
                                ? <>
                                    <DialogContentText>
                                        <b>Quantity: {quantity}</b>
                                        <br/>
                                        <span className={quantity > instQuantity-reservedAtTargetTime ? 'ReservationForm-quantity-error' : null}>
                                        (Available at Desired Time: {instQuantity-reservedAtTargetTime})
                                        </span>
                                    </DialogContentText>
                                    <div className='ReservationForm-slider-div'>
                                        <Slider
                                            aria-label='Quantity'
                                            value={quantity.toString()}
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
                                : <>
                                {reservedAtTargetTime > 0
                                    ? <div className='ReservationForm-quantity-error'>Not Available at Desired Time</div>
                                    : null
                                }
                                </>
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
                                        views={['year','month','day','hours']}
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
                            <div className='ReservationForm-timezone-wrapper'>
                                <TimezoneSelect
                                    value={timeZone}
                                    onChange={(newTimeZone) => setTimeZone(newTimeZone)}
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
    )
}

export default ReservationForm;
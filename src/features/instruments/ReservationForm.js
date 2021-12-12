import { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { DateTime } from 'luxon';
import TimezoneSelect from 'react-timezone-select';
import './ReservationForm.css';

const ReservationForm = ({ instName, instQuantity, instReservations }) => {
    const [open, setOpen] = useState(false);
    const [startTime, setStartTime] = useState(DateTime.now().startOf('hour').plus({ hours: 1}));
    const [endTime, setEndTime] = useState(DateTime.now().startOf('hour').plus({ hours: 3}));
    const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');
    const [reservedAtTargetTime, setReservedAtTargetTime] = useState(0);
    const [loading, setLoading] = useState(false);


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
    
    const handleSubmit = () => {
        console.log('hit')
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
                                : null
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
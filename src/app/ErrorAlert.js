import { Alert, Snackbar } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ErrorAlert = ({error, dispAction}) => {
    const dispatch = useDispatch();

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return;
        dispatch({ type: `${dispAction}` });
    }

    useEffect(() => {
        return () => {
            dispatch({ type: `${dispAction}` });
        }
    }, [dispatch, dispAction])

    return (
        <Snackbar
            open={true}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom',  horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }} variant='filled'>
                <b>{error.status}:</b> {error.message}
            </Alert>
        </Snackbar>
    )
}

export default ErrorAlert;
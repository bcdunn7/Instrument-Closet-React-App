import { Alert, Snackbar } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ErrorAlert = ({error}) => {
    const dispatch = useDispatch();

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return;
        dispatch({ type: 'user/clearError' });
    }

    useEffect(() => {
        return () => {
            dispatch({ type: 'user/clearError' });
        }
    }, [])

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
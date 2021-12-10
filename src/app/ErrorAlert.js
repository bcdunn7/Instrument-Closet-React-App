import { Alert, AlertTitle } from '@mui/material';
import './ErrorAlert.css';
import { useDispatch } from 'react-redux';

const ErrorAlert = ({error}) => {
    const dispatch = useDispatch();

    return (
        <div className="ErrorAlert-holder">
            <Alert severity="error" onClose={() => {
                dispatch({ type: 'user/clearError' });
            }}>
                <AlertTitle>Error</AlertTitle>
                <b>{error.status}:</b> {error.message}
            </Alert>
        </div>
    )
}

export default ErrorAlert;
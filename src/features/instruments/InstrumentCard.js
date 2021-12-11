import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './InstrumentCard.css'

const InstrumentCard = ({ inst }) => {
    const navigate = useNavigate();

    const handleReserveClick = (e) => {
        e.preventDefault();
        navigate(`/instruments/${e.target.dataset.id}`)
    }

    return (
        <Card className='InstrumentCard'>
            <CardContent>
                <Typography className='InstrumentCard-name' variant='h5'>{inst.name}</Typography>
                <Typography className='InstrumentCard-quantity' >{inst.quantity}</Typography>
                <Typography className='InstrumentCard-description' >{inst.description}</Typography>
            </CardContent>
            <CardActions>
                <Button className='InstrumentCard-btn' onClick={handleReserveClick} data-id={inst.id} color='primaryDark'>Reserve</Button>
            </CardActions>
        </Card>
    )
}

export default InstrumentCard;
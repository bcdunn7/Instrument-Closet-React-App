import { Card, CardActions, CardContent, Typography, Chip, Grid, CardMedia, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './InstrumentCard.css'

const InstrumentCard = ({ inst }) => {
    const navigate = useNavigate();

    const handleReserveClick = (e) => {
        e.preventDefault();
        navigate(`/instruments/${inst.id}`)
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className='InstrumentCard'>
                <CardActionArea onClick={handleReserveClick} className='InstrumentCard-action-area'>
                    <CardMedia
                        component='img'
                        height='180'
                        image={`/images/${inst.imageURL}`}
                        alt={`${inst.imageURL}`}
                    />
                    <CardContent className='InstrumentCard-content'>
                        <Typography className='InstrumentCard-name' variant='h5'>{inst.name}</Typography>
                        <Typography className='InstrumentCard-description' >{inst.description}</Typography>
                        <div>{inst.categories.map(c => <Chip key={c.id} className='InstrumentCard-Chip' color='primary' size='small' label={c.category}/>)}</div>
                    </CardContent>
                    <CardActions>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography className='InstrumentCard-footer'>Quantity: {inst.quantity}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className='InstrumentCard-footer InstrumentCard-footer-right'>Click to Reserve</Typography>
                            </Grid>
                        </Grid>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default InstrumentCard;
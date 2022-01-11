import { Button, Grid } from '@mui/material';
import { DateTime } from 'luxon';
import './ReservationCard.css';
import NumbersIcon from '@mui/icons-material/Numbers';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';

const ReservationCard = ({ resvData, handleDeleteClick }) => {
    const navigate = useNavigate();
    const inThePast = DateTime.fromSeconds(resvData.endTime) < DateTime.now();

    const handleEditClick = (e) => {
        e.preventDefault();
        navigate(`/reservations/${resvData.id}`);
    }

    return (
        <div className={inThePast ? 'ReservationCard past' : 'ReservationCard'}>
            <Grid container spacing={2} justifyContent='space-between' alignItems='center'>
                <Grid item xs={9} lg={3}>
                    <b>{resvData.instrumentName}</b>
                </Grid>
                <Grid item xs={3} lg={1} className='text-center'>
                    <NumbersIcon />
                    <span >
                        {resvData.quantity}
                    </span>
                </Grid>
                <Grid item xs={12} md={4} lg={3} className='text-center'>
                    <QueryBuilderIcon />
                    <span >
                        {DateTime.fromSeconds(resvData.startTime).toLocaleString(DateTime.DATETIME_MED)}
                    </span>
                </Grid>
                <Grid item xs={12} md={4} lg={3} className='text-center'>
                    <WatchLaterIcon />
                    <span >
                        {DateTime.fromSeconds(resvData.endTime).toLocaleString(DateTime.DATETIME_MED)}
                    </span>
                </Grid>
                <Grid item xs={6} md={2} lg={1}>
                    <Button onClick={handleEditClick} color='primaryDark' variant='contained' disabled={inThePast ? true : false}>{inThePast ? 'Old' : 'Edit'}</Button>
                </Grid>
                <Grid item xs={6} md={2} lg={1}>
                    <Button onClick={handleDeleteClick} color='warning' variant='contained' data-resvid={resvData.id}><DeleteForeverIcon data-resvid={resvData.id} /></Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default ReservationCard;
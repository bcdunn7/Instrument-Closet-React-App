import { Button, Grid } from '@mui/material';
import { DateTime } from 'luxon';
import './ReservationCard.css';
import NumbersIcon from '@mui/icons-material/Numbers';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const ReservationCard = ({ resvData }) => {
    const inThePast = DateTime.fromSeconds(resvData.endTime) < DateTime.now();

    return (
        <div className={inThePast ? 'ReservationCard past' : 'ReservationCard'}>
            <Grid container spacing={2} justifyContent='space-between' alignItems='center'>
                <Grid item xs={4}>
                    <b>{resvData.instrumentName}</b>
                </Grid>
                <Grid item xs={1} className='text-center'>
                    <NumbersIcon/> 
                    <span >
                        {resvData.quantity}
                    </span>
                </Grid>
                <Grid item xs={3} className='text-center'>
                    <QueryBuilderIcon/> 
                    <span >
                        {DateTime.fromSeconds(resvData.startTime).toLocaleString(DateTime.DATETIME_MED)}
                    </span>
                </Grid>
                <Grid item xs={3} className='text-center'>
                    <WatchLaterIcon/> 
                    <span >
                        {DateTime.fromSeconds(resvData.endTime).toLocaleString(DateTime.DATETIME_MED)}
                    </span>
                </Grid>
                <Grid item xs={1}>
                    <Button color='primaryDark' variant='contained' disabled={inThePast ? true : false}>{inThePast ? 'Old' : 'Edit'}</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default ReservationCard;
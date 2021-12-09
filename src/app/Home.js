import './Home.css';
import guitarImage from './Guitar-Transparent.png';
import Grid from '@mui/material/Grid';
import LoginForm from '../features/auth/LoginForm';

const Home = () => {

    return (
        <div className="Home">
            <Grid container spacing={0}>
                <Grid item xs={7}>
                    <div className='Home-login-div'>
                        <h2>
                         An Instrument Inventory & <br/>
                         Reservation System.</h2>
                        <p>Sign in to get started</p>
                        <LoginForm/>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className='Home-img-container'>
                        <img src={guitarImage} />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;
import './Home.css';
import guitarImage from './Guitar-Transparent.png';
import Grid from '@mui/material/Grid';
import LoginForm from '../features/users/LoginForm';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';

const Home = () => {
    const token = useSelector(state => state.user.token);
    const userData = useSelector(state => state.user.userData);

    return (
        <div className="Home">
            <Grid container spacing={0}>
                <Grid item xs={12} md={7}>
                    <div className='Home-login-div'>
                        <h2>
                            An Instrument Inventory & <br />
                            Reservation System.</h2>
                        {token
                            ? <p>Welcome Back {userData.username}!</p>
                            : <p>Sign in to get started</p>
                        }
                        <LoginForm />
                    </div>
                </Grid>
                <Box display={{ xs: 'none', md: 'block' }}>
                    <Grid item xs={0} md={5}>
                        <div className='Home-img-container'>
                            <img src={guitarImage} alt='' />
                        </div>
                    </Grid>
                </Box>
            </Grid>
        </div>
    )
}

export default Home;
import { Link, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    return (
        <div className='Navbar'>
            <Stack justifyContent='space-between' direction={{ xs: 'column', lg: 'row' }}>
                <Stack direction='row' spacing={2}>
                    <Link to='/' className='Navbar-logo'><span>T</span>he<span>I</span>nstrument<span>C</span>loset</Link>
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    {token
                        ? <>
                            <NavLink className='Navbar-navlink' to='/instruments'>
                                <Button color='primaryDark'>Instrument List</Button>
                            </NavLink>
                            <NavLink className='Navbar-navlink' to='/reservations'>
                                <Button color='primaryDark'>My Reservations</Button>
                            </NavLink>
                            <NavLink className='Navbar-navlink' to='/profile'>
                                <Button color='primaryDark'>Profile</Button>
                            </NavLink>
                            <div className='Navbar-navlink'>
                                <Button color='primaryDark' onClick={() => dispatch({ type: 'user/logoutUser' })}>Logout</Button>
                            </div>
                        </>
                        :
                        <NavLink className='Navbar-navlink' to='/signup'>
                            <Button className='Navbar-signup-btn' color='primaryDark'>
                                Signup Now!
                            </Button>
                        </NavLink>
                    }
                </Stack>
            </Stack>
        </div>
    )
}

export default Navbar;
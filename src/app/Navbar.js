import { Link, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
    const token = useSelector(state => state.user.token);

    return (
        <div className='Navbar'>
            <Stack justifyContent='space-between' direction='row'>
                <Stack direction='row' spacing={2}>
                    <Link to='/' className='Navbar-logo'><span>T</span>he<span>I</span>nstrument<span>C</span>loset</Link>
                </Stack>
                <Stack direction='row' spacing={2}>
                    {token 
                        ? <><NavLink className='Navbar-navlink' to='/instruments'>
                            <Button color='primaryDark'>Instrument List</Button>
                        </NavLink>
                        <NavLink className='Navbar-navlink' to='/profile'>
                            <Button color='primaryDark'>Profile</Button>
                        </NavLink></>
                        : <NavLink className='Navbar-navlink' to='/signup'>
                            <Button className='Navbar-signup-btns' color='primaryDark'>
                                <span className='Navbar-signup-btn-noaccount'>Don't Have An Account?</span>
                                <span className='Navbar-signup-btn-signup'>Signup Now!</span>
                            </Button>
                        </NavLink>
                    }
                </Stack>
            </Stack>
        </div>
    )
}

export default Navbar;
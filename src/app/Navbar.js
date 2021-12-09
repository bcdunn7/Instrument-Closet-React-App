import { Link, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className='Navbar'>
            <Stack direction='row' spacing={2}>
                <Link to='/' className='Navbar-logo'><span>T</span>he<span>I</span>nstrument<span>C</span>loset</Link>
                <NavLink className='Navbar-navlink' to='/login'><Button>Login</Button></NavLink>
                <NavLink className='Navbar-navlink' to='/signup'><Button>Sign Up</Button></NavLink>
                <NavLink className='Navbar-navlink' to='/instruments'><Button>Instrument List</Button></NavLink>
                <NavLink className='Navbar-navlink' to='/profile'><Button>Profile</Button></NavLink>
            </Stack>
        </div>
    )
}

export default Navbar;
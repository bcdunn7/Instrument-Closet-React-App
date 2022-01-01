import './Footer.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@mui/material';

const Footer = () => {
    return(
        <footer className='Footer'>
            <span>
                Backend 
                <a href='https://github.com/bcdunn7/Instrument-Closet-Backend'>    
                    <GitHubIcon className='Footer-icon' color='primaryDark' fontSize='inherit'/>
                </a>
            </span>
            <span>
                <b>T</b>he<b>I</b>nstrument<b>C</b>loset. 
            </span>
            <span>
                Frontend 
                <a href='https://github.com/bcdunn7/Instrument-Closet-React-App'>    
                    <GitHubIcon className='Footer-icon' color='primaryDark' fontSize='inherit'/>
                </a>
            </span>
        </footer>
    )
}

export default Footer;
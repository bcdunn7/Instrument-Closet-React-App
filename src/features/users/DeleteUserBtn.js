import { Dialog, Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DeleteUserBtn.css';
import { deleteUser } from './userSlice';

const DeleteUserBtn = () => {
    const username = useSelector(state => state.user.userData.username);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Button 
                id='DeleteUserBtn-main'
                onClick={handleOpen} 
                variant='contained' 
                fullWidth 
                color='warning'
            >
                Delete Account
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <div className='DeleteUserBtn-div'>
                    <p>Are you sure you want to delete your account?</p>
                    <div className='DeleteUserBtn-div-btns'>
                        <Button id='DeleteUserBtn-confirm' variant='contained' color='warning' onClick={() => dispatch(deleteUser(username))}>Yes, Delete Account</Button>
                        <Button id='DeleteUserBtn-cancel' variant='contained' color='secondaryDarker' onClick={handleClose}>Cancel</Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default DeleteUserBtn;
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css'
import { useDispatch } from 'react-redux';
import { getAllInstruments } from './instrumentsSlice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(getAllInstruments({...formData}))
    }

    return (
        <form onSubmit={handleSearch} className='SearchBar'>
            <TextField 
                name='name'
                label='Search Instruments' 
                variant='outlined' 
                fullWidth 
                color='primaryDark'
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>
                                        <IconButton type='submit'>
                                            <SearchIcon/>
                                        </IconButton>
                                    </InputAdornment>
                }}
            />
        </form>
    )
}

export default SearchBar;
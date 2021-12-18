import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({ filter }) => {
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
                                        <IconButton>
                                            Search
                                        </IconButton>
                                    </InputAdornment>
                }}
            />
        </form>
    )
}

export default SearchBar;
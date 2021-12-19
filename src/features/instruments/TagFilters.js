import { useDispatch, useSelector } from 'react-redux';
import { Chip, Stack } from '@mui/material';
import './TagFilters.css';

const TagFilters = () => {
    const dispatch = useDispatch();
    const instruments = useSelector(st => st.instruments.entities);
    const selectedCategories = useSelector(st => st.instruments.selectedCategories);

    const categories = instruments.reduce((sum, next) => {
        for (let cat of next.categories) {
            if (!sum.includes(cat.category)) return [...sum, cat.category]
              else return sum;
        }
        return sum;
    }, [])

    const handleClick = (e) => {
        if (!selectedCategories.includes(e.target.innerText)) {
            dispatch({ type: 'instruments/categorySelected', payload: e.target.innerText })
        } else dispatch({ type: 'instruments/categoryRemoved', payload: e.target.innerText })
    }

    return (
        <div className='TagFilters-div'>
            <Stack direction='row' spacing={2}>
                <span className='TagFilters-span'>Filter by type →</span>
                {categories.map(c => (
                    <Chip 
                        className='TagFilters-chip' 
                        onClick={handleClick} 
                        key={c} 
                        label={c}
                        {...selectedCategories.includes(c) ? {color: 'primaryDark'} : null}
                    />)
                )}
            </Stack>
        </div>
    )
}

export default TagFilters;
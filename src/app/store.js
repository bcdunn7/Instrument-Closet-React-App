import { configureStore } from '@reduxjs/toolkit';

import instrumentsReducer from '../features/instruments/instrumentsSlice';
import userReducer from '../features/users/userSlice';

const store = configureStore({
    reducer: {
        instruments: instrumentsReducer,
        user: userReducer
    },
}) 

export default store;
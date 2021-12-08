import { configureStore } from '@reduxjs/toolkit';

import instrumentsReducer from '../features/instruments/instrumentsSlice';

const store = configureStore({
    reducer: {
        instruments: instrumentsReducer
    },
}) 

export default store;
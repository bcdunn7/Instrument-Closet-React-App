import { createSlice } from "@reduxjs/toolkit"; 
import ClosetAPI from '../../services/api';

export function getAllInstruments(filter) {
    return async function getAllInstrumentsThunk(dispatch) {
        const resp = await ClosetAPI.getAllInstruments(filter);
        dispatch({ type: 'instruments/instrumentsLoaded', payload: resp.instruments })
    }
}

export function getInstrumentReservations(data) {
    return async function getInstResvsThunk(dispatch) {
        try {
            const resp = await ClosetAPI.getInstrumentReservations(data);
            dispatch({ type: 'instruments/instrumentReservationsLoaded', payload: resp.reservations })
        } catch (e) {
            console.error(e[0].data.error);
        }
    }
}

const initialState = {
    entities: [],
    currInstrument: {},
    selectedCategories: []
};

export const instrumentsSlice = createSlice({
    name: 'instruments',
    initialState,
    reducers: {
        instrumentsLoaded(state, action) {
            state.entities = action.payload
        },
        instrumentReservationsLoaded(state, action) {
            state.currInstrument.reservations = action.payload;
        },
        newReservationAdded(state, action) {
            state.currInstrument.reservations = [...state.currInstrument.reservations, action.payload];
        },
        categorySelected(state, action) {
            state.selectedCategories = [...state.selectedCategories, action.payload];
        },
        categoryRemoved(state, action) {
            state.selectedCategories = state.selectedCategories.filter(c => c !== action.payload);
        }
    }
})


export const { instrumentsLoaded, instrumentReservationsLoaded, newReservationAdded, categorySelected, categoryRemoved } = instrumentsSlice.actions;

export default instrumentsSlice.reducer;
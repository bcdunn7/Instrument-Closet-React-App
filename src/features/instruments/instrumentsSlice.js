import { createSlice } from "@reduxjs/toolkit"; 
import ClosetAPI from '../../services/api';

export async function getAllInstruments(dispatch) {
    const resp = await ClosetAPI.getAllInstruments();
    dispatch({ type: 'instruments/instrumentsLoaded', payload: resp.instruments })
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
    currInstrument: {}
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
        }
    }
})


export const { instrumentsLoaded, instrumentReservationsLoaded, newReservationAdded } = instrumentsSlice.actions;

export default instrumentsSlice.reducer;
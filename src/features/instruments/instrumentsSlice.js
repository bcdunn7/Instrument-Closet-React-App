import { createSlice } from "@reduxjs/toolkit"; 
import ClosetAPI from '../../services/api';

export async function getAllInstruments(dispatch) {
    const resp = await ClosetAPI.getAllInstruments();
    dispatch({ type: 'instruments/instrumentsLoaded', payload: resp.instruments })
}

const initialState = {
    entities: []
};

export const instrumentsSlice = createSlice({
    name: 'instruments',
    initialState,
    reducers: {
        instrumentsLoaded(state, action) {
            state.entities = action.payload
        }
    }
})


export const { instrumentsLoaded } = instrumentsSlice.actions;

export default instrumentsSlice.reducer;
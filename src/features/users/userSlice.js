import { createSlice } from "@reduxjs/toolkit";
import ClosetAPI from "../../services/api";

export function loginUser(data) {
    return async function loginUserThunk(dispatch) {
       const resp = await ClosetAPI.login(data);
       dispatch({ type: 'user/userLoggedIn' , payload: resp.token })
    }
};

const initialState = {
    token: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedIn(state, action) {
            state.token = action.payload
        }
    }
})

export const { userLoggedIn } = userSlice.actions;

export default userSlice.reducer;
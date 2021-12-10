import { createSlice } from "@reduxjs/toolkit";
import ClosetAPI from "../../services/api";

export function loginUser(data) {
    return async function loginUserThunk(dispatch) {
        try {
            const resp = await ClosetAPI.login(data);
            dispatch({ type: 'user/userLoggedIn' , payload: resp.token })
        } catch (e) {
            console.error(e[0].data.error);
            dispatch({ type: 'user/loginError', payload: e[0].data.error })
        }
    }
};

export function registerUser(data) {
    return async function registerUserThunk(dispatch) {
        try {
            const resp = await ClosetAPI.register(data);
            dispatch({ type: 'user/userRegistered', payload: resp.token })
        } catch (e) {
            console.error(e[0].data.error);
            dispatch({ type: 'user/registerError', payload: e[0].data.error })
        }
    }
}

const initialState = {
    token: null,
    error: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedIn(state, action) {
            state.token = action.payload;
        },
        loginError(state, action) {
            state.error = action.payload;
        },
        userRegistered(state, action) {
            state.token = action.payload;
        },
        registerError(state, action) {
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        }
    }
})

export const { userLoggedIn, userRegistered } = userSlice.actions;

export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import ClosetAPI from "../../services/api";

export function loginUser(data) {
    return async function loginUserThunk(dispatch) {
        try {
            const resp = await ClosetAPI.login(data);
            localStorage.setItem('token', resp.token);
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
            localStorage.setItem('token', resp.token);
            dispatch({ type: 'user/userRegistered', payload: resp.token })
        } catch (e) {
            console.error(e[0].data.error);
            dispatch({ type: 'user/registerError', payload: e[0].data.error })
        }
    }
}

export function getUserData(username) {
    return async function getUserDataThunk(dispatch) {
        try {
            const resp = await ClosetAPI.getUserData(username);
            dispatch({ type: 'user/userDataLoaded', payload: resp.user })
        } catch (e) {
            console.error(e[0].data.error);
            // distpach error here?
        }
    }
}

const initialState = {
    userData: {},
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
        userDataLoaded(state, action) {
            state.userData = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
        setTokenFromLocalStorage(state, action) {
            state.token = action.payload;
        }
    }
})

export const { userLoggedIn, userRegistered, loginError, registerError, userDataLoaded, clearError } = userSlice.actions;

export default userSlice.reducer;
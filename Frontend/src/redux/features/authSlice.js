import { createSlice } from "@reduxjs/toolkit";
import { loginUser, loadCurrentUser } from "./authThunk.js";

const initialState = {
    user: null,
    username:"User",
    role:"guest",
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },

        clearError(state) {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.username = action.payload.username;
                state.role = action.payload.role;
                state.isAuthenticated = true;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // LOAD USER
            .addCase(loadCurrentUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(loadCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.username = action.payload.username;
                state.role = action.payload.role;
                state.isAuthenticated = true;
            })

            .addCase(loadCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    }
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
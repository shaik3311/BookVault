import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, thunkAPI) => {
        try {
            // Login
            const loginRes = await axios.post(
                "http://localhost:3000/api/auth/login",
                credentials,
                {
                    withCredentials: true
                }
            );
            
            const accessToken = loginRes.data.accessToken;

            localStorage.setItem("accessToken", accessToken);

            // Get User Info
            const userRes = await axios.get(
                "http://localhost:3000/api/auth/getInfo",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            );

            return userRes.data.user;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login Failed"
            );
        }
    }
);

export const loadCurrentUser = createAsyncThunk(
    "auth/loadCurrentUser",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");

            const res = await axios.get(
                "http://localhost:3000/api/auth/getInfo",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return res.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);
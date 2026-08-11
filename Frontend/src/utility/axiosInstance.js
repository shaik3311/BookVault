import axios from "axios";
import { getAccessToken } from "./getAccessToken";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh")
        ) {
            originalRequest._retry = true;

            const newAccessToken = await getAccessToken();

            if (newAccessToken) {

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
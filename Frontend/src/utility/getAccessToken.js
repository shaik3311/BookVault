import axios from "axios";

export const getAccessToken = async () => {
    try {
        const res = await axios.post(
            "http://localhost:3000/api/auth/refresh",
            {},
            {
                withCredentials: true,
            }
        );

        const accessToken = res.data.access_Token;

        localStorage.setItem("accessToken", accessToken);

        return accessToken;
    } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loggedUser");

        window.location.href = "/login";

        return null;
    }
};
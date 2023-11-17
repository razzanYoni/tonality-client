import axios from "axios";

export const restUrl: string = import.meta.env.VITE_REST_URL;

const api = axios.create({
    baseURL: restUrl + "api/",
    headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
    },
    withCredentials : true,
    timeout: 1000,
});

export default  api;
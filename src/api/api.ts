import axios from "axios";

const restApiUrl: string = import.meta.env.VITE_REST_API_URL;

const api = axios.create({
    baseURL: restApiUrl,
    headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
    },
    withCredentials : true,
    timeout: 1000,
});

export default  api;
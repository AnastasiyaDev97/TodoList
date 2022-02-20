import axios from "axios";
import { EMPTY_STRING } from "../constants";
export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY||EMPTY_STRING
    },
})
import axios from "axios";

export const instance = axios.create({
  baseURL:
    "https://social-network.samuraijs.com/api/1.1/" /*  process.env.REACT_APP_BASE_URL */,
  withCredentials: true,
  headers: {
    "API-KEY":
      "78ba9efb-88a6-4c7f-b505-5ad3ba5a9466" /* process.env.REACT_APP_API_KEY || EMPTY_STRING */,
  },
});

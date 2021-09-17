import axios from "axios";
const baseURL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL;
export const xhr = axios.create({ baseURL });

export const xhrAuth = (token) =>
  axios.create({
    baseURL,
    headers: { authorization: `Bearer ${token}` },
  });

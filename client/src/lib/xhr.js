import axios from "axios";

const xhr = axios.create({
  baseURL: (process.env.NODE_ENV !== 'production') ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_API_URL,
});

export default xhr;
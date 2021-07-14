import { configureStore } from '@reduxjs/toolkit'
import apiDataReducer from './reducers/apiSlice.js';
export default configureStore({
    reducer: {
        apiData: apiDataReducer
    },
});
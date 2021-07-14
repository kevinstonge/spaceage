import { createSlice } from '@reduxjs/toolkit'
import hashCode from '../lib/hashCode.js';
export const apiSlice = createSlice({
  name: 'apiData',
  initialState: {
    'null': { },
  },
  reducers: {
    addData: (state, action) => {
          const queryHash = hashCode(action.payload.query);
          if (state[queryHash]) { return }
          else {
              state = { ...state, [queryHash]: action.payload.data }
          }
    }
  },
});

export const { addData } = apiSlice.actions

export default apiSlice.reducer

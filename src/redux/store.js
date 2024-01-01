import { configureStore } from '@reduxjs/toolkit'
import {schoolDashBoardSlice} from "./reducerSlice"


export const store = configureStore({
  reducer:{schoolDashBoardSlice},
})
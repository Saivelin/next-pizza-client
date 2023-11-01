import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categoryReducer";
import categorySlice from "./categorySlice"

const rootReducer = combineReducers({
    toolkit: categorySlice
})

export const store = configureStore({
    reducer: rootReducer
})
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./";
import { formSliceReducer } from "./";

export const store = configureStore({
    reducer: {
        global: globalReducer,
        formSlice: formSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
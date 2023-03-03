import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

//To be used throughout the app instead of the standard useDispatch and useSelector

//It's destructuring a function by destructuring useDispatch. The type is () => AppDispatch which means function with output AppDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
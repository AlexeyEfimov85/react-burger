import { useDispatch as dispatchHook, useSelector as selectorHook, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "..";


export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import imageCardReducer from "../features/image-card/imageCardSlice";

export const store = configureStore({
  reducer: {
    imageCard: imageCardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

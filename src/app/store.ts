import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import imageFeedReducer from "../features/image-feed/imageFeedSlice";
import imageShareReducer from "../features/image-share/imageShareSlice";

export const store = configureStore({
  reducer: {
    imageFeed: imageFeedReducer,
    imageShare: imageShareReducer,
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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchImages } from "./imageFeedAPI";
import { ImageCardProps } from "../image-card/ImageCard";
import { RootState } from "../../app/store";

export interface ImageFeedState {
  status: "idle" | "loading" | "failed";
  images: ImageCardProps[];
  query: string;
  page: number;
  likes: string | null;
}

const initialState: ImageFeedState = {
  status: "idle",
  images: [],
  query: "planets",
  page: 1,
  // since this is a frontend assessment, and I am not expected to create a backend,
  // I will be using localStorage to persist state
  likes: localStorage.getItem("likes") ? localStorage.getItem("likes") : "",
};

export const queryImagesAsync = createAsyncThunk(
  "imageCard/fetchImages",
  async (args?: { query?: string; page?: number }) => {
    const response = await fetchImages(args?.query, args?.page);
    const queryResult = response.data.collection.items.map((item: any) => {
      return {
        title: item.data[0].title,
        date: item.data[0].date_created,
        description: item.data[0].description,
        nasaId: item.data[0].nasa_id,
        keywords: item.data[0].keywords,
        url: item.links[0].href,
      };
    });
    return { query: args?.query, page: args?.page, queryResult };
  }
);

export const imagesNextPage = createAsyncThunk<
  ImageCardProps[],
  any,
  { state: RootState }
>("imageCard/nextPage", async (arg, thunkApi): Promise<ImageCardProps[]> => {
  const state: RootState = thunkApi.getState();
  const response = await fetchImages(
    state.imageFeed.query,
    state.imageFeed.page + 1
  );
  return response.data.collection.items.map((item: any) => {
    return {
      title: item.data[0].title,
      date: item.data[0].date_created,
      description: item.data[0].description,
      nasaId: item.data[0].nasa_id,
      keywords: item.data[0].keywords,
      url: item.links[0].href,
    };
  });
});

export const imageFeedSlice = createSlice({
  name: "imageFeed",
  initialState,
  reducers: {
    addLike: (state, action) => {
      state.likes += action.payload + ",";
      localStorage.setItem("likes", state.likes ? state.likes : "");
    },
    removeLike: (state, action) => {
      if (state.likes) {
        state.likes = state.likes.replace(action.payload + ",", "");
        localStorage.setItem("likes", state.likes ? state.likes : "");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(queryImagesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(queryImagesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.images = action.payload.queryResult;
        state.query = action.payload.query ? action.payload.query : state.query;
        state.page = action.payload.page ? action.payload.page : state.page;
      })
      .addCase(queryImagesAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(imagesNextPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(imagesNextPage.fulfilled, (state, action) => {
        state.status = "idle";
        state.images = [...state.images, ...action.payload];
        state.page++;
      })
      .addCase(imagesNextPage.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { removeLike, addLike } = imageFeedSlice.actions;

export const selectImages = (state: RootState) => state.imageFeed.images;
export const selectImageStatus = (state: RootState) => state.imageFeed.status;
export const selectImageQuery = (state: RootState) => state.imageFeed.query;
export const selectLikes = (state: RootState) => state.imageFeed.likes;

export default imageFeedSlice.reducer;

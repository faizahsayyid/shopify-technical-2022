import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ImageCardProps } from "../image-card/ImageCard";
import { fetchImagesById } from "./imageShareAPI";

export interface ImageShareState {
  status: "idle" | "loading" | "failed";
  image: ImageCardProps;
  errorMessage: string;
}

const initialState: ImageShareState = {
  status: "idle",
  image: {
    title: "",
    date: "",
    url: "",
    description: "",
    keywords: [],
    nasaId: "",
  },
  errorMessage: "Could not make your search. Please try again.",
};

export const fetchImageShare = createAsyncThunk(
  "imageCard/fetchImages",
  async (id: string) => {
    const response = await fetchImagesById(id);
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
    console.log({ queryResult, id });
    return queryResult[0];
  }
);

export const imageFeedSlice = createSlice({
  name: "imageShare",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImageShare.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImageShare.fulfilled, (state, action) => {
        state.status = "idle";
        state.image = action.payload;
      })
      .addCase(fetchImageShare.rejected, (state, action) => {
        state.errorMessage =
          typeof action.payload === "string"
            ? action.payload
            : "Could not make your search. Please try again.";
      });
  },
});

export const selectImage = (state: RootState) => state.imageShare.image;
export const selectImageStatus = (state: RootState) => state.imageShare.status;
export default imageFeedSlice.reducer;

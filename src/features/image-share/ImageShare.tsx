import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ImageCard } from "../image-card/ImageCard";
import {
  selectImage,
  selectImageStatus,
  fetchImageShare,
} from "./imageShareSlice";
import { Loading } from "../loading/Loading";
import { Error } from "../error/Error";
import { useAppDispatch } from "../../app/hooks";
import { useParams } from "react-router-dom";

export const ImageShare = () => {
  const image = useSelector(selectImage);
  const imagesLoadingStatus = useSelector(selectImageStatus);
  const dispatch = useAppDispatch();
  const params: { id: string } = useParams();

  useEffect(() => {
    dispatch(fetchImageShare(params.id));
  }, [dispatch, params]);

  return (
    <main className="app-content">
      {imagesLoadingStatus === "idle" && (
        <ImageCard
          title={image.title}
          nasaId={image.nasaId}
          keywords={image.keywords}
          date={image.date}
          description={image.description}
          key={image.nasaId}
          url={image.url}
        />
      )}
      {image === null && imagesLoadingStatus === "idle" && (
        <p className="">There are no image the id.</p>
      )}
      {imagesLoadingStatus === "loading" && <Loading />}
      {imagesLoadingStatus === "failed" && <Error />}
    </main>
  );
};

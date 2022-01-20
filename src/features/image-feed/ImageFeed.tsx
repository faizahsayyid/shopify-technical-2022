import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import useBackToTop from "../../hooks/useBackToTop";
import useInfiniteImageScrolling from "../../hooks/useInfiniteImageScrolling";
import { ImageCard } from "../image-card/ImageCard";
import {
  queryImagesAsync,
  selectImages,
  selectImageStatus,
} from "./imageFeedSlice";
import { Loading } from "../loading/Loading";
import { SearchBar } from "../search/SearchBar";
import { Error } from "../error/Error";
import { FaAngleUp } from "react-icons/fa";

export const ImageFeed = () => {
  const images = useSelector(selectImages);
  const imagesLoadingStatus = useSelector(selectImageStatus);
  const dispatch = useAppDispatch();
  const { scrollElementRef, isBackToTopVisible, scrollToTop } = useBackToTop();
  const { lastElementRef } = useInfiniteImageScrolling();

  useEffect(() => {
    dispatch(queryImagesAsync());
  }, [dispatch]);

  return (
    <main className="app-content">
      <SearchBar />
      {images.length === 0 && imagesLoadingStatus === "idle" && (
        <p className="text-warning app-no-match">
          There are no results that match your query.
        </p>
      )}
      {images !== [] &&
        images.map((data, index) => {
          if (index === 0) {
            return (
              <ImageCard
                title={data.title}
                nasaId={data.nasaId}
                keywords={data.keywords}
                date={data.date}
                description={data.description}
                key={data.nasaId}
                url={data.url}
                innerRef={scrollElementRef}
              />
            );
          } else if (index === images.length - 1) {
            return (
              <ImageCard
                title={data.title}
                nasaId={data.nasaId}
                keywords={data.keywords}
                date={data.date}
                description={data.description}
                key={data.nasaId}
                url={data.url}
                innerRef={lastElementRef}
              />
            );
          } else {
            return (
              <ImageCard
                title={data.title}
                nasaId={data.nasaId}
                keywords={data.keywords}
                date={data.date}
                description={data.description}
                key={data.nasaId}
                url={data.url}
              />
            );
          }
        })}
      {imagesLoadingStatus === "loading" && <Loading />}
      {imagesLoadingStatus === "failed" && <Error />}
      {isBackToTopVisible && (
        <button className="btn scroll-top-btn" onClick={scrollToTop}>
          <FaAngleUp size="3em" />
        </button>
      )}
    </main>
  );
};

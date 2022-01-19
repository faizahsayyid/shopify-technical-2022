import { useEffect } from "react";
import { ImageCard } from "./features/image-card/ImageCard";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import {
  queryImagesAsync,
  selectImages,
  selectImageStatus,
} from "./features/image-card/imageCardSlice";
import { useSelector } from "react-redux";
import { FaAngleUp } from "react-icons/fa";
import { IoMdPlanet } from "react-icons/io";
import useBackToTop from "./hooks/useBackToTop";
import useInfiniteImageScrolling from "./hooks/useInfiniteImageScrolling";
import { SearchBar } from "./features/search/SearchBar";

function App() {
  const images = useSelector(selectImages);
  const imagesLoadingStatus = useSelector(selectImageStatus);
  const dispatch = useAppDispatch();
  const { scrollElementRef, isBackToTopVisible, scrollToTop } = useBackToTop();
  const { lastElementRef } = useInfiniteImageScrolling();

  useEffect(() => {
    dispatch(queryImagesAsync());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="app-header">
        <IoMdPlanet size="3em" />
        <h1 className="text-warning app-title" onClick={scrollToTop}>
          NASA Explore
        </h1>
      </header>
      <main className="app-content">
        <SearchBar />
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
        {imagesLoadingStatus === "loading" && (
          <h2 className="text-warning">"Loading.."</h2>
        )}
        {imagesLoadingStatus === "failed" && (
          <p className="text-danger">Error</p>
        )}
      </main>
      {isBackToTopVisible && (
        <button className="btn scroll-top-btn" onClick={scrollToTop}>
          <FaAngleUp size="3em" />
        </button>
      )}
    </div>
  );
}

export default App;

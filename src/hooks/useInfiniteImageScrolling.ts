import { MutableRefObject, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import {
  imagesNextPage,
  selectImageStatus,
} from "../features/image-feed/imageFeedSlice";

const useInfiniteImageScrolling = () => {
  const lastElementObserver: MutableRefObject<
    IntersectionObserver | undefined
  > = useRef();
  const imagesLoadingStatus = useSelector(selectImageStatus);
  const dispatch = useAppDispatch();

  const lastElementRef = useCallback(
    (el: HTMLElement) => {
      if (imagesLoadingStatus === "loading") return;

      if (lastElementObserver.current) {
        lastElementObserver.current.disconnect();
      }

      lastElementObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(imagesNextPage(null));
        }
      });

      if (el) {
        lastElementObserver.current.observe(el);
      }
    },
    [imagesLoadingStatus, dispatch]
  );

  return { lastElementRef };
};

export default useInfiniteImageScrolling;

import { MutableRefObject, useRef, useState } from "react";

const useBackToTop = () => {
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const scrollElementObserver: MutableRefObject<
    IntersectionObserver | undefined
  > = useRef();

  const scrollElementRef = (el: HTMLElement) => {
    if (scrollElementObserver.current) return;
    scrollElementObserver.current = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        setIsBackToTopVisible(true);
      } else {
        setIsBackToTopVisible(false);
      }
    });
    if (el) {
      scrollElementObserver.current.observe(el);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { isBackToTopVisible, scrollElementRef, scrollToTop };
};

export default useBackToTop;

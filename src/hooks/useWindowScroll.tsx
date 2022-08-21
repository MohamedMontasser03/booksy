import { useEffect, useRef } from "react";

export const useWindowScroll = (
  scrollCallback: (scroll: { x: number; y: number }) => void
) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = (e: Event) => {
      const { scrollX, scrollY } = e.target as Window;
      scrollCallback({ x: scrollX, y: scrollY });
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollCallback]);
};

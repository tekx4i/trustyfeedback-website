import { useCallback } from "react";

export const useDebounce = (callback, delay) => {
  let timeoutId;

  return useCallback(
    (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};

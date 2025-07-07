"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

type LoadingContextType = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const loadingStartTime = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startLoading = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      loadingStartTime.current = Date.now();
    }
  }, [isLoading]);

  const stopLoading = useCallback(() => {
    const minDuration = 1200;
    const now = Date.now();
    const elapsed = loadingStartTime.current
      ? now - loadingStartTime.current
      : 0;
    const remaining = Math.max(minDuration - elapsed, 0);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      loadingStartTime.current = null;
    }, remaining);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

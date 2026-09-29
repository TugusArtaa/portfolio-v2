"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export type TransitionPhase =
  | "idle"
  | "entering"
  | "visible"
  | "fadeout"
  | "exiting";

export interface PageInfo {
  title: string;
  subtitle: string;
}

export const ROUTE_METADATA: Record<string, PageInfo> = {
  "/": {
    title: "HOME",
    subtitle: "Back to the beginning, personal portfolio",
  },
  "/about": {
    title: "ABOUT",
    subtitle: "The story, the vision, the lens",
  },
  "/projects": {
    title: "PROJECTS",
    subtitle: "Selected works, case studies & open source",
  },
  "/contact": {
    title: "CONTACT",
    subtitle: "Let's discuss, connect & create together",
  },
};

export function getRouteInfo(path: string): PageInfo {
  if (ROUTE_METADATA[path]) {
    return ROUTE_METADATA[path];
  }
  if (path.startsWith("/projects/")) {
    const slug = path.replace("/projects/", "").replace(/-/g, " ");
    const formatted = slug
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      title: formatted.toUpperCase(),
      subtitle: "Case study & technical implementation",
    };
  }
  return {
    title: "DISCOVER",
    subtitle: "Exploring portfolio content",
  };
}

interface TransitionContextType {
  isTransitioning: boolean;
  isInitialLoading: boolean;
  isInitialPageReveal: boolean;
  phase: TransitionPhase;
  targetPath: string;
  targetInfo: PageInfo;
  cols: number;
  navigateTo: (href: string) => void;
  completeInitialLoading: () => void;
  // Backwards compatibility for old useLoading
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  isInitialLoading: true,
  isInitialPageReveal: false,
  phase: "idle",
  targetPath: "",
  targetInfo: { title: "HOME", subtitle: "Personal Portfolio" },
  cols: 5,
  navigateTo: () => {},
  completeInitialLoading: () => {},
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const useTransition = () => useContext(TransitionContext);
export const useLoading = () => useContext(TransitionContext);

export const TransitionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  // Column count (3 on mobile < 768px, 5 on desktop)
  const [cols, setCols] = useState(5);
  useEffect(() => {
    const updateCols = () => setCols(window.innerWidth < 768 ? 3 : 5);
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  // 1. Initial State:
  // - Home ("/") -> opening preloader (multilingual counter)
  // - Non-Home (e.g. "/about") -> navigating shutter reveal
  const [isInitialLoading, setIsInitialLoading] = useState(isHome);
  const [isInitialPageReveal, setIsInitialPageReveal] = useState(!isHome);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<TransitionPhase>(
    isHome ? "idle" : "fadeout"
  );
  const [targetPath, setTargetPath] = useState(pathname || "/");
  const [targetInfo, setTargetInfo] = useState<PageInfo>(() =>
    getRouteInfo(pathname || "/")
  );

  const isNavigating = useRef(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // Lock body scrolling while shutters or preloader cover the screen
  useEffect(() => {
    if (isInitialLoading || isInitialPageReveal || isTransitioning) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isInitialLoading, isInitialPageReveal, isTransitioning]);

  // Initial reveal sequence for non-home pages (e.g. refreshing /about)
  useEffect(() => {
    if (!isHome) {
      // Read saved navName/navDesc from sessionStorage if available
      if (typeof window !== "undefined") {
        const savedName = sessionStorage.getItem("navName");
        const savedDesc = sessionStorage.getItem("navDesc");
        if (savedName || savedDesc) {
          setTargetInfo({
            title: savedName || getRouteInfo(pathname || "/").title,
            subtitle: savedDesc || getRouteInfo(pathname || "/").subtitle,
          });
        }
      }

      // Step 1: Hold content for 300ms in "fadeout"
      const t1 = setTimeout(() => {
        // Step 2: Columns slide UP ("exiting")
        setPhase("exiting");

        const exitDuration = 750 + (cols - 1) * 90 + 200;
        const t2 = setTimeout(() => {
          setIsInitialPageReveal(false);
          setPhase("idle");
        }, exitDuration);
        timersRef.current.push(t2);
      }, 350);

      timersRef.current.push(t1);
    }

    return clearAllTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Complete initial preloader on Home (called when counter hits 100% & finishes staircase)
  const completeInitialLoading = useCallback(() => {
    setIsInitialLoading(false);
    setPhase("idle");
  }, []);

  // When pathname changes after router.push during in-app navigation
  useEffect(() => {
    if (isNavigating.current) {
      isNavigating.current = false;

      // Ensure viewport instantly scrolls to top before opening shutters
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }

      // Step 1: Hold target content in "fadeout" state for 250ms
      setPhase("fadeout");

      const t1 = setTimeout(() => {
        // Step 2: Columns slide UP ("exiting")
        setPhase("exiting");

        const exitDuration = 750 + (cols - 1) * 90 + 200;
        const t2 = setTimeout(() => {
          setIsTransitioning(false);
          setPhase("idle");
        }, exitDuration);
        timersRef.current.push(t2);
      }, 250);

      timersRef.current.push(t1);
    }
  }, [pathname, cols]);

  // Cleanup on unmount
  useEffect(() => {
    return clearAllTimers;
  }, []);

  // In-app navigation handler
  const navigateTo = useCallback(
    (href: string) => {
      if (isNavigating.current) return;
      if (href === pathname || href === `${pathname}/`) return;
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        window.location.href = href;
        return;
      }

      clearAllTimers();
      isNavigating.current = true;
      const info = getRouteInfo(href);
      setTargetPath(href);
      setTargetInfo(info);
      setIsTransitioning(true);

      // Save to sessionStorage like wildan.pics
      if (typeof window !== "undefined") {
        sessionStorage.setItem("navName", info.title);
        sessionStorage.setItem("navDesc", info.subtitle);
      }

      // Step 1: Shutter columns slide DOWN ("entering")
      setPhase("entering");

      // Step 2: At 350ms (while shutters are still sliding), reveal text ("visible")
      const t1 = setTimeout(() => {
        setPhase("visible");
      }, 350);
      timersRef.current.push(t1);

      // Step 3: At 1200ms (shutters closed, scramble complete), push route
      const t2 = setTimeout(() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        }
        router.push(href);
      }, 1200);
      timersRef.current.push(t2);
    },
    [pathname, router]
  );

  const startLoading = useCallback(() => setIsTransitioning(true), []);
  const stopLoading = useCallback(() => {
    setIsTransitioning(false);
    setPhase("idle");
  }, []);

  const value = useMemo(
    () => ({
      isTransitioning,
      isInitialLoading,
      isInitialPageReveal,
      phase,
      targetPath,
      targetInfo,
      cols,
      navigateTo,
      completeInitialLoading,
      isLoading: isTransitioning || isInitialLoading || isInitialPageReveal,
      startLoading,
      stopLoading,
    }),
    [
      isTransitioning,
      isInitialLoading,
      isInitialPageReveal,
      phase,
      targetPath,
      targetInfo,
      cols,
      navigateTo,
      completeInitialLoading,
      startLoading,
      stopLoading,
    ]
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionProvider;

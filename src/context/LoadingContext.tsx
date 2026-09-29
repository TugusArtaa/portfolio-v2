"use client";

// Re-export from TransitionContext to maintain 100% backward compatibility
export {
  useLoading,
  useTransition,
  TransitionProvider as LoadingProvider,
  TransitionProvider,
  getRouteInfo,
} from "./TransitionContext";
export type { TransitionPhase, PageInfo } from "./TransitionContext";

/**
 * Shared animation constants for page transitions and interactive UI components.
 * Single source of truth - import from here instead of redeclaring per-file.
 */

/** Cubic-bezier matching wildan.pics exact easing curve */
export const EASE_BEZIER = [0.76, 0, 0.24, 1] as const;

/** ReactBits signature calm easing curve (ultra-smooth quintic deceleration) */
export const REACTBITS_EASE = [0.22, 1, 0.36, 1] as const;

/** Apple/Vercel smooth editorial deceleration curve */
export const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

/** Full scramble charset: letters + digits + symbols (BrandLogo, TextScramble) */
export const SCRAMBLE_CHARSET_FULL =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?';

/** Alpha-only scramble charset: letters only (NavTextScramble - Module 17881) */
export const SCRAMBLE_CHARSET_ALPHA =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

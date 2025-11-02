/**
 * Haptic Feedback Utility
 * Provides tactile feedback for user interactions
 * Inspired by Wealthsimple's premium mobile experience
 */

export type HapticStyle = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

/**
 * Trigger haptic feedback
 * @param style - The intensity/pattern of haptic feedback
 */
export const haptic = (style: HapticStyle = 'light'): void => {
  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Check if device supports vibration
  if (!('vibrate' in navigator)) {
    return;
  }

  // Define vibration patterns (in milliseconds)
  const patterns: Record<HapticStyle, number | number[]> = {
    light: 10,                      // Quick tap (button hover, selection)
    medium: 20,                     // Button press, input focus
    heavy: 30,                      // Important action (submit, delete)
    success: [10, 50, 10],          // Success pattern (transaction added)
    warning: [20, 100, 20],         // Warning pattern (approaching limit)
    error: [30, 100, 30, 100, 30],  // Error pattern (validation failed)
  };

  try {
    navigator.vibrate(patterns[style]);
  } catch (error) {
    // Silently fail - haptics are enhancement, not critical
    console.debug('Haptic feedback not supported:', error);
  }
};

/**
 * Wrapper for onClick handlers with haptic feedback
 * @param callback - The function to call after haptic
 * @param style - The haptic style to use
 */
export const hapticOnClick = (
  callback?: () => void,
  style: HapticStyle = 'light'
) => {
  return () => {
    haptic(style);
    callback?.();
  };
};

/**
 * Success haptic (use after successful operations)
 */
export const hapticSuccess = (): void => {
  haptic('success');
};

/**
 * Error haptic (use after failed operations)
 */
export const hapticError = (): void => {
  haptic('error');
};

/**
 * Warning haptic (use for warnings or alerts)
 */
export const hapticWarning = (): void => {
  haptic('warning');
};

/**
 * Selection haptic (use for toggles, radio buttons, etc.)
 */
export const hapticSelection = (): void => {
  haptic('light');
};

/**
 * Impact haptic (use for impactful actions like submit)
 */
export const hapticImpact = (): void => {
  haptic('heavy');
};

/**
 * Hook for haptic feedback in React components
 * @example
 * const { triggerHaptic } = useHaptic();
 * <button onClick={() => triggerHaptic('medium')}>Click</button>
 */
export const useHaptic = () => {
  const triggerHaptic = (style: HapticStyle = 'light') => {
    haptic(style);
  };

  return { triggerHaptic, haptic };
};

/**
 * Check if device supports haptic feedback
 */
export const isHapticSupported = (): boolean => {
  return 'vibrate' in navigator;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};


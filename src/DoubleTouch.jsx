import { useRef } from 'react';

export function useDoubleTap(callback, delay = 300) {
  const lastTap = useRef(0);

  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastTap.current < delay) {
      callback();
    }
    lastTap.current = now;
  };

  return {
    onTouchEnd: handleTouchEnd,
  };
}

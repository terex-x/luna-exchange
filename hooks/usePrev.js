import { useEffect, useRef } from 'react';

export default function usePrev(value) {
  const prevRef = useRef();

  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  return prevRef.current;
}

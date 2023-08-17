import { useRef, useEffect } from 'preact/compat';

function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });

    return ref.current;
};

export default usePrevious;
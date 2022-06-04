import  { useEffect, useRef } from 'react';
// See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
import useIsomorphicLayoutEffect  from './useIsomorphicLayoutEffect'

export default function useInterval(callback: any, delay: any, onStart?: boolean) {
    const savedCallback: any = useRef<any>();

    useEffect(() => {
        if(delay){
            onStart && callback();
        }
    }, [delay]);

    // Remember the latest callback.
    useIsomorphicLayoutEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

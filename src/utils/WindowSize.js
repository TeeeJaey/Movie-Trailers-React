/*
    A custom reusable hook to capture change in the window size
*/

import { useLayoutEffect, useState } from 'react';

export default function useWindowSize() {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        let timeout; 
        
        function updateSize() {
            clearTimeout(timeout);
            timeout = setTimeout(()=>{
                setSize([window.innerWidth, window.innerHeight]);
                console.log("Width Changed");
            },500)
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
}

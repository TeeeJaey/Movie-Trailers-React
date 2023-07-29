import { useLayoutEffect, useState } from "react";

// A custom reusable hook to capture change in the window size
export default function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        let timeout;

        function updateSize() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setSize({ width: window.innerWidth, height: window.innerHeight });
                console.log("Width Changed");
            }, 500);
        }

        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
}

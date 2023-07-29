import { useEffect, useState } from "react";
import { splitList } from "../utils/Utilities.js";

/**
 * A custom reusable hook to enable infinite scrolling effect
 * for applications that have full list of data to be renderred
 * Takes 2 arguments
 * - mainList - the whole list of data which will be divided into parts
 * - dependencyArray - dependency array for the useEfffect that sets the first data
 */
export default function useScrollEffect(mainList, dependencyList) {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [listItems, setListItems] = useState([]);

    // Split list into parts
    let list = splitList(mainList, 20);

    // Run on every scroll
    const handleScroll = () => {
        if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight || isLoading) return;

        if (page < list.length - 1) setIsLoading(true);
    };

    // useEffect to set initial data
    useEffect(() => {
        if (list && list.length > 0) {
            const data = list[1];
            if (data && data.length > 0) setListItems(() => [...data]);
            else setListItems(() => []);

            window.scrollTo({ top: 0, behavior: "smooth" });

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, dependencyList);

    // useEffect to set the data after scrolled beyond the existing data
    useEffect(() => {
        if (!isLoading) return;

        setTimeout(() => {
            if (page < list.length - 1) {
                const data = list[page + 1];
                setPage(page + 1);
                if (data && data.length > 0) setListItems(() => [...listItems, ...data]);
            }
        }, 300);

        setIsLoading(false);
    }, [isLoading]);

    return listItems;
}

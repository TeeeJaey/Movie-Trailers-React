import React, {useEffect,useState} from "react";
import Utilities from "../utils/Utilities.js";


export default function useScrollEffect(mainList, dependencyArray) {
    
    let splitList = Utilities.splitList(mainList,20);

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [listItems, setListItems] = useState([]);


    const handleScroll = () => {
        if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight
                || isLoading)
            return;
            
        if(page < splitList.length - 1)
            setIsLoading(true);
    };

    useEffect(() => {
        if(splitList && splitList.length > 0) {
            const data = splitList[1];
            if(data && data.length > 0)
                setListItems(() => [...data]);
            else
                setListItems(() => []);

            window.scrollTo({top: 0, behavior: 'smooth'});

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
        
    }, dependencyArray);
    

    useEffect(() => {
        if (!isLoading) return;
        
        setTimeout(() => {
            if(page < splitList.length - 1) {
                const data = splitList[page+1];
                setPage(page + 1);
                if(data && data.length > 0)
                    setListItems(() => [...listItems, ...data]);
            }
        },300);
        
        setIsLoading(false);
    }, [isLoading]);

    return listItems;
}



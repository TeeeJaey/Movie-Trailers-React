/*
    A Reusable component to enable infinite scrolling effect 
    for applications that have full list of data to be renderred

    Takes 2 arguments
        mainList - the whole list of data which will be divided into parts
        dependencyArray - dependency array for the useEfffect that sets the first data 
*/

//#region "Imports"
import {useEffect,useState} from "react";
import Utilities from "../utils/Utilities.js";
//#endregion

export default function useScrollEffect(mainList, dependencyArray) {
    //#region "Definiions"
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [listItems, setListItems] = useState([]);
    //#endregion
    
    //#region "Use the utility function to split list into parts"
    let splitList = Utilities.splitList(mainList,20);
    //#endregion

    //#region "Function run on every scroll"
    const handleScroll = () => {
        if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight
                || isLoading)
            return;
            
        if(page < splitList.length - 1)
            setIsLoading(true);
    };
    //#endregion

    //#region "useEffect to set initial data"
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
    //#endregion
    

    //#region "useEffect to set the data after scrolled beyond the existing data"
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
    //#endregion

    return listItems;
}

import React, { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import '../Styles/Dashboard.css';
import AppliedFilters from "./AppliedFilters";
import Constants from "../Utils/Constants";
import Utilities from "../Utils/Utilities";

const MovieBlock = React.lazy(() => import("./MovieBlock"));

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [listItems, setListItems] = useState([]);

    const moviesList = useSelector(state => state.moviesList);
    const sortBy = useSelector(state => state.sortBy);
    const languageFilter = useSelector(state => state.languageFilter);
    const genreFilter = useSelector(state => state.genreFilter);

    let movieSplitList = [];

    if(moviesList && moviesList.length > 0) {
        let filteredMoviesList = [...moviesList];

        if(languageFilter && languageFilter.length > 0)
            filteredMoviesList = filteredMoviesList.filter(movie=>languageFilter.includes(movie.EventLanguage));
        
        if(genreFilter && genreFilter.length > 0) {
            filteredMoviesList = filteredMoviesList.filter(movie => {
                let movieGenres = movie.EventGenre.split('|');
                
                for(let j=0; j<genreFilter.length; j++) {
                    const genre = genreFilter[j];
                    
                    if(movieGenres.includes(genre)) return true;
                }
                return false;
            });
        }
        
        if(sortBy === Constants.SortBy.Fresh) {
            filteredMoviesList.sort((a,b) => b.trailerUploadDate - a.trailerUploadDate);
        }
        else if(sortBy === Constants.SortBy.Popular) {
            filteredMoviesList.sort((a,b) => b.wtsCount - a.wtsCount);
        }

        movieSplitList = Utilities.splitList(filteredMoviesList,20);
    }

    const handleScroll = () => {
        if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight
                || isLoading)
            return;
            
        if(page < movieSplitList.length - 1)
            setIsLoading(true);
    };

    useEffect(() => {
        if(movieSplitList && movieSplitList.length > 0) {
            const data = movieSplitList[1];
            if(data && data.length > 0)
                setListItems(() => [...data]);
            else
                setListItems(() => []);

            window.scrollTo({top: 0, behavior: 'smooth'});

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
        
    }, [moviesList, sortBy, languageFilter, genreFilter]);
    

    useEffect(() => {
        if (!isLoading) return;
        
        setTimeout(() => {
            if(page < movieSplitList.length - 1) {
                const data = movieSplitList[page+1];
                setPage(page + 1);
                if(data && data.length > 0)
                    setListItems(() => [...listItems, ...data]);
            }
        },300);
        
        setIsLoading(false);
    }, [isLoading]);

    return (
        <div className="dashboard">
            <AppliedFilters/>

            <div className="movie-list">
                {listItems && listItems.map((movie,key) => (
                    <div key={movie.EventCode + key} >
                        <Suspense fallback={<div style={{display:"none"}}></div>} >
                            <MovieBlock key={movie.EventCode + key}  movie={movie} />
                        </Suspense>
                    </div>
                ))}
            </div>
        </div>
    );
}



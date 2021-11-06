import React, { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import '../styles/Dashboard.css';
import AppliedFilters from "./AppliedFilters";
import Constants from "../utils/Constants";
import Utilities from "../utils/Utilities";
import useScrollEffect from "../utils/ScrollEffect";

const MovieBlock = React.lazy(() => import("./MovieBlock"));

export default function Dashboard() {
    const moviesList = useSelector(state => state.moviesList);
    const sortBy = useSelector(state => state.sortBy);
    const languageFilter = useSelector(state => state.languageFilter);
    const genreFilter = useSelector(state => state.genreFilter);
    
    let filteredMoviesList = [];

    if(moviesList && moviesList.length > 0) {
        filteredMoviesList = [...moviesList];

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
    
    }

    const listItems = useScrollEffect(filteredMoviesList, [moviesList, sortBy, languageFilter, genreFilter]);

    return (
        <div className="dashboard">
            <AppliedFilters/>

            <div className="movie-list">
                {listItems && listItems.map((movie,key) => (
                    <div key={movie.EventCode + key} >
                                    
                        <iframe width="450" height="300" title={movie.EventTitle} style={{display:"none"}}
                                src={"https://www.youtube.com/embed/" + movie.TrailerURL.split("=")[1].split("&")[0]} >
                        </iframe>
                        
                        <Suspense fallback={<div style={{display:"none"}}></div>} >
                            <MovieBlock key={movie.EventCode + key}  movie={movie} />
                        </Suspense>
                    </div>
                ))}
            </div>
        </div>
    );
}



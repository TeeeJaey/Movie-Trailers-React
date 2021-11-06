import React, { useState, useEffect, Suspense } from "react";
import ReactDOM from 'react-dom';
import { useDispatch, useSelector, Provider } from 'react-redux';

import store from '../store/Store.js';
import '../styles/Dashboard.css';
import AppliedFilters from "./AppliedFilters";
import Constants from "../utils/Constants";
import Utilities from "../utils/Utilities";
import useScrollEffect from "../utils/ScrollEffect";
import Trailer from "./Trailer";

const MovieBlock = React.lazy(() => import("./MovieBlock"));

export default function Dashboard() {
    const moviesList = useSelector(state => state.moviesList);
    const sortBy = useSelector(state => state.sortBy);
    const languageFilter = useSelector(state => state.languageFilter);
    const genreFilter = useSelector(state => state.genreFilter);
    const runningTrailerID = useSelector(state => state.runningTrailerID);
    
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

    useEffect(()=>{

        const oldTrailerNodes = document.getElementsByClassName("trailer-component");
        if(oldTrailerNodes && oldTrailerNodes.length > 0)
            oldTrailerNodes[0].parentNode.removeChild(oldTrailerNodes[0]);

        if(runningTrailerID && runningTrailerID != "") {
            const movie = moviesList.find(m => m.EventCode === runningTrailerID);
            

            const movieListElement = document.getElementsByClassName("movie-list")[0];
            const movieBlockNode = document.getElementById(runningTrailerID);

            const TrailerComponent = document.createElement("div");
            TrailerComponent.className = "trailer-component";
            TrailerComponent.id = "trailer-component-" + runningTrailerID;
            movieListElement.insertBefore(TrailerComponent , movieBlockNode);
            TrailerComponent.style.width = "100%";

            ReactDOM.render(
                <Provider store={store} >
                    <Trailer movie={movie} />
                </Provider>,
                document.getElementById(TrailerComponent.id)
            );
        }
    }, [runningTrailerID]);

    return (
        <div className="dashboard">
            <AppliedFilters/>

            <div className="movie-list">
                {listItems && listItems.map((movie) => (
                    <div key={movie.EventCode} id={movie.EventCode} >
                        <Suspense fallback={<div style={{display:"none"}}></div>} >
                            <MovieBlock key={movie.EventCode}  movie={movie} />
                        </Suspense>
                    </div>
                ))}
            </div>
        </div>
    );
}



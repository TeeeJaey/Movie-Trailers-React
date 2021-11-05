import React from "react";
import { useDispatch, useSelector } from "react-redux";
import '../Styles/dashboard.css';
import AppliedFilters from "./AppliedFilters";
import startBtnImage from "../images/start-btn.png";
import Constants from "../Utils/Constants";

export default function Dashboard() {
    const dispatch = useDispatch();
    let moviesData = useSelector(state => state.moviesData);
    let sortBy = useSelector(state => state.sortBy);
    
    let movieList = [];
    for(const key in moviesData) {
        let movie = moviesData[key];
        movie.key = key;
        movieList.push(movie);
    }
    
    if(sortBy == Constants.SortBy.Fresh) {
        movieList.sort((a,b) => a.trailerUploadDate - b.trailerUploadDate);
    }
    else if(sortBy == Constants.SortBy.Popular) {
        movieList.sort((a,b) => a.wtsCount - b.wtsCount);
    }

    return (
        <div className="dashboard">
            <AppliedFilters/>

            <div className="movie-list">
                {movieList.map((movie)=>{
                    return  <div key={movie.key} className="movie">
                                <div className="movie-image">
                                    <img src={movie.EventImageUrl} 
                                         className="image"
                                         alt={movie.EventTitle} />
                                    <img src={startBtnImage} className="start-btn" />
                                </div>
                                <div className="movie-name">
                                    {movie.EventTitle}
                                </div>
                            </div>;
                })}
            </div>
        </div>
    );
}

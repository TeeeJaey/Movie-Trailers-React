import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdThumbUp } from "react-icons/md";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import '../Styles/dashboard.css';
import AppliedFilters from "./AppliedFilters";
import startBtnImage from "../Images/start-btn.png";
import Constants from "../Utils/Constants";

export default function Dashboard() {
    const dispatch = useDispatch();
    let moviesData = useSelector(state => state.moviesData);
    let sortBy = useSelector(state => state.sortBy);
    let languageFilter = useSelector(state => state.languageFilter);
    let genreFilter = useSelector(state => state.genreFilter);
    
    let movieList = [];
    for(const key in moviesData) {
        let movie = moviesData[key];
        movieList.push(movie);
    }

    if(languageFilter && languageFilter.length > 0)
        movieList = movieList.filter(x=>languageFilter.includes(x.EventLanguage));
    
    
    if(sortBy === Constants.SortBy.Fresh) {
        movieList.sort((a,b) => b.trailerUploadDate - a.trailerUploadDate);
    }
    else if(sortBy === Constants.SortBy.Popular) {
        movieList.sort((a,b) => b.wtsCount - a.wtsCount);
    }

    const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    return (
        <div className="dashboard">
            <AppliedFilters/>

            <div className="movie-list">
                {movieList.map((movie,i)=>{

                    let genreSatisfied = false;
                    if(genreFilter && genreFilter.length > 0) {
                        let genreList = movie.EventGenre.split('|');
                        genreList.forEach(genre => {
                            if(genreFilter.includes(genre)) {
                                genreSatisfied = true;
                            }
                        }); 
                    }
                    else 
                        genreSatisfied = true;
                    
                    if(genreSatisfied) {
                        const date = movie.TrailerURLUploadDate.split('-');
                        const year = parseInt(date[0]);
                        const month = months[parseInt(date[1])];

                        return  <div key={i} className="movie">
                                    <div className="movie-image">
                                        <div className="movie-date">
                                            <span className="month">{month}</span>
                                            <span className="year">{year}</span>
                                        </div>

                                        <LazyLoadImage effect="blur" 
                                            src={movie.EventImageUrl} 
                                            className="image"
                                            alt={movie.EventTitle} />

                                        <img src={startBtnImage} alt="play" className="start-btn" />
                                        
                                        <div className="movie-rating">
                                            <div className="flex-evenly">
                                                <MdThumbUp className="thumbsup-ico"/>
                                                <div>{movie.wtsPerc}%</div>
                                            </div>
                                            <div className="flex-evenly">
                                                <div className="vote-count">{movie.wtsCount} votes</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div key={movie.code} className="movie-name">
                                        {movie.EventTitle}
                                    </div>
                                </div>;
                    }
                    else
                        return <div key={i}></div>;
                })}
            </div>
        </div>
    );
}

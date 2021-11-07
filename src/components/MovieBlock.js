import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdThumbUp } from "react-icons/md";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import '../styles/MovieBlock.css';
import startBtnImage from "../images/start-btn.png";
import Actions from "../store/Actions";

export default function MovieBlock({movie, select}) {
    const runningTrailerID = useSelector(state => state.runningTrailerID);
    const disptch = useDispatch();

    const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const date = movie.TrailerURLUploadDate.split('-');
    const year = parseInt(date[0]);
    const month = months[parseInt(date[1])];

    let showPlay = (runningTrailerID && runningTrailerID == movie.EventCode) ? false : true  ;

    return  <div key={movie.EventCode} className="movie" onClick={()=>disptch(Actions.RunTrailer(movie.EventCode))} >
                <div className="movie-image" style={showPlay? {cursor:"pointer"}:{cursor:"default"}}>
                    <div className="movie-date">
                        <span className="month">{month}</span>
                        <span className="year">{year}</span>
                    </div>

                    <LazyLoadImage effect="blur" 
                        src={movie.EventImageUrl} 
                        className="image"
                        alt={movie.EventTitle} />

                    {showPlay && 
                        <img src={startBtnImage} alt="play" className="start-btn" />
                    }

                    <div className="movie-rating">
                        <div className="flex-evenly">
                            <MdThumbUp className="thumbsup-ico"/>
                            <div>{movie.ratings.wtsPerc}%</div>
                        </div>
                        <div className="flex-evenly">
                            <div className="vote-count">{movie.ratings.wtsCount} votes</div>
                        </div>
                    </div>
                </div>
                <div key={movie.EventCode} className="movie-name">
                    {movie.EventTitle}
                </div>
            </div>;
}
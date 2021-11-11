/*
    The Movie card component called from Dashboard.
    Takes movie object as props
    Also dispatches action to redux store to set the running Trailer
    on click of any Movie card
*/

//#region "Imports"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdThumbUp } from "react-icons/md";

import '../styles/MovieCard.css';
import startBtnImage from "../images/start-btn.png";
import Actions from "../store/Actions";
import { LazyImage } from "../utils/LazyImage";
//#endregion

export default function MovieCard({movie}) {
    //#region "Definitions"
    const runningTrailerID = useSelector(state => state.runningTrailerID);
    const disptch = useDispatch();
    //#endregion

    //#region "Set the month and year to be shown on the card (top right)"
    const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const date = movie.TrailerURLUploadDate.split('-');
    const year = parseInt(date[0]);
    const month = months[parseInt(date[1])];
    //#endregion

    //#region "Set a boolean field - whether to show the play icon on card (hidden when already playing)"
    let showPlay = (runningTrailerID && runningTrailerID == movie.EventCode) ? false : true ;
    //#endregion
    
    //#region "Render"
    /*
        Render the Movie card related details on the card image
        Render the Movie title below the image
        Lazy load the images with blur effect
    */
   
    return  <div key={movie.EventCode} className="movie" onClick={()=>disptch(Actions.RunTrailer(movie.EventCode))} >
                <div className="movie-image" style={showPlay? {cursor:"pointer"}:{cursor:"default"}}>
                    <div className="movie-date">
                        <span className="month">{month}</span>
                        <span className="year">{year}</span>
                    </div>

                    <LazyImage
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
    //#endregion
}
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdThumbUp } from "react-icons/md";

import "../styles/MovieCard.css";
import startBtnImage from "../images/start-btn.png";
import { runTrailer } from "../store/actions";
import LazyImage from "../utils/LazyImage";

/**
 * The Movie card component called from Dashboard.
 * Also dispatches action to redux store to set the running Trailer
 * on click of any Movie card
 */
export default function MovieCard({ movie }) {
    const runningTrailerID = useSelector(state => state.runningTrailerID);
    const disptch = useDispatch();

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = movie.TrailerURLUploadDate.split("-");
    const year = parseInt(date[0]);
    const month = months[parseInt(date[1])];

    const showPlay = runningTrailerID && runningTrailerID == movie.EventCode ? false : true;
    const movieImageStyle = showPlay ? { cursor: "pointer" } : { cursor: "default" };

    return (
        <div key={movie.EventCode} className="movie" onClick={() => disptch(runTrailer(movie.EventCode))}>
            <div className="movie-image" style={movieImageStyle}>
                <div className="movie-date">
                    <span className="month">{month}</span>
                    <span className="year">{year}</span>
                </div>

                <LazyImage src={movie.EventImageUrl} className="image" alt={movie.EventTitle} />

                {showPlay && <img src={startBtnImage} alt="play" className="start-btn" />}

                <div className="movie-rating">
                    <div className="flex-evenly">
                        <MdThumbUp className="thumbsup-ico" />
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
        </div>
    );
    //#endregion
}

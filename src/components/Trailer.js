/*
    The Trailer component is called when user clicks on MovieCard 
    This component is called from the Dashboard and 
    its position in the flex is dynamically calculated in Dashboard
*/

//#region "Imports"
import React, { useEffect, useRef } from "react";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import { BiQuestionMark } from "react-icons/bi"; 

import '../styles/Trailer.css';
import useWindowSize from "../utils/WindowSize";
//#endregion

export default function Trailer({movie}) {
    //#region "Imports"
    const [width, height] = useWindowSize();
    const trailerRef = useRef(null);
    //#endregion

    //#region "Set the date to be shown on the right side (details section)"
    const date = movie.ShowDate.split(' ');
    const day = date[0];
    const month = date[1].split(',')[0];
    const year = date[2];
    //#endregion

    //#region "Important trailer id to be used in the useEffect and in Rendering"
    const trailerID = movie.TrailerURL.split("v=")[1].split("&")[0];
    //#endregion
    
    //#region "Scroll to the trailer when a trailer is loaded or when the window is resized"
    useEffect(()=>{
        if(trailerID && trailerID !== "") {
            window.scrollTo(0, trailerRef.current.offsetTop - 130);
        }
    }, [trailerID, width]);
    //#endregion

    //#region "Render"
    /*
        Render the Movie Trailer block above the selected card's row
        On the left would be the trailer video running on YOUTUBE
        On the right would be the details of the movie and few like/dislike buttons
    */

    return  <div ref={trailerRef} className="trailer-container" >
                <iframe id={trailerID} title={movie.EventTitle} className="trailer-iframe"
                        src = {"https://www.youtube.com/embed/" + trailerID + "?autoplay=1&mute=1&enablejsapi=1"} 
                        frameborder="0" allowtransparency="true" allowFullScreen="true"
                />
                <div className="movie-details">
                    <div className="title"> {movie.EventTitle} </div>
                    <div className="language"> {movie.EventLanguage} ({movie.EventDimension}) </div>
                    <div className="genre-list"> 
                        {movie.EventGenre.split('|').map(genre => <div className="genre">{genre}</div>)}
                    </div>

                    <div className="rate-date flex-row">
                        <MdThumbUp className="icon"/>
                        <div className="rate flex-column">
                            <div className="big-text">{movie.ratings.wtsPerc}%</div>
                            <div className="small-text">{movie.ratings.wtsCount} votes</div>
                        </div>
                        
                        <GoCalendar className="icon" style={{marginLeft:"20px"}} />
                        <div className="date flex-column">
                            <div className="big-text">{day + " " + month} </div>
                            <div className="small-text">{year}</div>
                        </div>
                    </div>
                    
                    <div className="watch-qstn flex-row">
                        <div className="flex-center" >
                            <MdThumbUp className="yes icon"/>
                            <div className="yes text">will watch</div>
                            <div className="yes text">({movie.ratings.wtsCount})</div>
                        </div>
                        <div className="flex-center" >
                            <BiQuestionMark className="maybe icon"/>
                            <div className="maybe text">maybe</div>
                            <div className="maybe text">({movie.ratings.maybe})</div>
                        </div>
                        <div className="flex-center" >
                            <MdThumbDown className="no icon"/>
                            <div className="no text">won't watch</div>
                            <div className="no text">({movie.ratings.dwtsCount})</div>
                        </div>
                    </div>
                </div>
            </div>;
    //#endregion
}
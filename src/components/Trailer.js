import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux";
import { MdThumbUp } from "react-icons/md";

import Actions from "../store/Actions";
import '../styles/Trailer.css';

export default function Trailer({movie}) {
    const disptch = useDispatch();
    const trailerRef = useRef(null)

    const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const date = movie.TrailerURLUploadDate.split('-');
    const year = parseInt(date[0]);
    const month = months[parseInt(date[1])];

    const trailerID = movie.TrailerURL.split("v=")[1].split("&")[0];
    
    useEffect(()=>{
        if(trailerID && trailerID!="") {
            window.scrollTo(0, trailerRef.current.offsetTop - 100);
        }
    }, [trailerID]);

    return  <div ref={trailerRef} className="trailer-container" >
                <iframe  id={trailerID} className="trailer-iframe"
                        src = {"http://www.youtube.com/embed/" + trailerID + "?autoplay=1&mute=1&enablejsapi=1"} 
                        frameborder="0" allowtransparency="true"
                        allowFullScreen="true"
                />
            </div>;
}
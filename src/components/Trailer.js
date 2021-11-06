import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdThumbUp } from "react-icons/md";

import Actions from "../store/Actions";
import '../styles/Trailer.css';

export default function Trailer({movie}) {
    const disptch = useDispatch();

    const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const date = movie.TrailerURLUploadDate.split('-');
    const year = parseInt(date[0]);
    const month = months[parseInt(date[1])];

    const trailerID = movie.TrailerURL.split("v=")[1].split("&")[0];

    return  <div className="trailer-container" >
                <iframe  id={trailerID} className="trailer-iframe"
                        src = {"https://www.youtube.com/embed/" + trailerID} 
                />
            </div>;
}
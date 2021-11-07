import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import config from "../config.json";
import Header from "./Header.js";
import Actions from "../store/Actions";
import Dashboard from "./Dashboard";
import '../styles/Main.css';

export default function Main() {
    const moviesList = useSelector(state => state.moviesList);
    const runningTrailerID = useSelector(state => state.runningTrailerID);

    const dispatch = useDispatch();

    React.useEffect(() => {
        axios.get(config.ApiUrl).then((res) => {
        if (res.status === 200) {
            dispatch(Actions.SetFullData(res.data));
        } else console.log("Error " + res.status);
        });
    }, []);

    let bgImage = "";
    if(runningTrailerID && runningTrailerID != "") {
        const movie = moviesList.find(m => m.EventCode === runningTrailerID);
        if(movie)
            bgImage = movie.EventImageUrl;
    }

    return (
        <div className="main">
            <div class="blur-bg" style={{backgroundImage:"url(" + bgImage + ")"}}></div>
            <Header />
            <Dashboard/>
        </div>
    );
}

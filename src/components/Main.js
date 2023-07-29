import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import config from "../config.json";
import dummyData from "../dummyData.json";
import Header from "./Header.js";
import { setFullData } from "../store/actions";
import Dashboard from "./Dashboard";
import "../styles/Main.css";

import * as img from "../images/loading.gif";
const loadingGif = img.default;
//const loadingGif = require("../images/loading.gif");

/**
 * Main component which is called from index.js
 * Calls the API to fetch the data on first load and
 * dispatches the action to redux store to set the full data
 */
export default function Main() {
    const moviesList = useSelector(state => state.moviesList);
    const runningTrailerID = useSelector(state => state.runningTrailerID);

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);

    // Make GET request to the API (The url is imported from config.json file)
    useEffect(() => {
        axios
            .get(config.ApiUrl)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setFullData(res.data));
                } else {
                    console.log("Error " + res.status);
                    dispatch(setFullData(dummyData));
                }
                setLoading(false);
            })
            .catch(e => {
                console.log("Error " + e);
                dispatch(setFullData(dummyData));
                setLoading(false);
            });
    }, []);

    // Set a translusent background image corresponding to the trailer that is running
    let bgImage = "";
    if (runningTrailerID && runningTrailerID != "") {
        const movie = moviesList.find(m => m.EventCode === runningTrailerID);
        if (movie) bgImage = movie.EventImageUrl;
    }
    const blurBG = { backgroundImage: "url(" + bgImage + ")" };

    return (
        <div className="main">
            <div className="blur-bg" style={blurBG}></div>
            <Header />
            {isLoading && (
                <div className="loading-gif">
                    <img src={loadingGif} alt="loading..." />
                </div>
            )}
            {!isLoading && <Dashboard />}
        </div>
    );
}

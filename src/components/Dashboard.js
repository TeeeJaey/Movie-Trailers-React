/*
    The Main Dashboard component - starts below the Header
    Includes the AppliedFilters component
    Calls the MovieBlock component for each movie in the movie list
*/

//#region "Imports"
import React, { useEffect, Suspense } from "react";
import ReactDOM from "react-dom";
import { useSelector, Provider } from "react-redux";

import store from "../store/Store.js";
import "../styles/Dashboard.css";
import AppliedFilters from "./AppliedFilters";
import Constants from "../utils/Constants";
import useScrollEffect from "../utils/ScrollEffect";
import Trailer from "./Trailer";
import useWindowSize from "../utils/WindowSize.js";

const MovieCard = React.lazy(() => import("./MovieCard"));
//#endregion

export default function Dashboard() {
    //#region "Definitions"
    const [width, height] = useWindowSize();
    const moviesList = useSelector(state => state.moviesList);
    const sortBy = useSelector(state => state.sortBy);
    const languageFilter = useSelector(state => state.languageFilter);
    const genreFilter = useSelector(state => state.genreFilter);
    const runningTrailerID = useSelector(state => state.runningTrailerID);
    //#endregion

    //#region "Filtering and Sorting the Movie List"
    let filteredMoviesList = [];
    if (moviesList && moviesList.length > 0) {
        filteredMoviesList = [...moviesList];

        if (languageFilter && languageFilter.length > 0)
            filteredMoviesList = filteredMoviesList.filter(movie => languageFilter.includes(movie.EventLanguage));

        if (genreFilter && genreFilter.length > 0) {
            filteredMoviesList = filteredMoviesList.filter(movie => {
                let movieGenres = movie.EventGenre.split("|");

                for (let j = 0; j < genreFilter.length; j++) {
                    const genre = genreFilter[j];

                    if (movieGenres.includes(genre)) return true;
                }
                return false;
            });
        }

        if (sortBy === Constants.SortBy.Fresh) {
            filteredMoviesList.sort((a, b) => b.trailerUploadDate - a.trailerUploadDate);
        } else if (sortBy === Constants.SortBy.Popular) {
            filteredMoviesList.sort((a, b) => parseInt(b.ratings.wtsCount) - parseInt(a.ratings.wtsCount));
        }
    }
    //#endregion

    //#region "Scrolling effect to load and render more movies on scroll"
    const listItems = useScrollEffect(filteredMoviesList, [moviesList, sortBy, languageFilter, genreFilter]);
    //#endregion

    //#region "Render the trailer node above the selected row"
    useEffect(() => {
        const oldTrailerNodes = document.getElementsByClassName("trailer-component");
        if (oldTrailerNodes && oldTrailerNodes.length > 0) oldTrailerNodes[0].parentNode.removeChild(oldTrailerNodes[0]);

        if (runningTrailerID && runningTrailerID !== "") {
            const movie = moviesList.find(m => m.EventCode === runningTrailerID);

            const movieBlockNode = document.getElementById(runningTrailerID);
            const TrailerComponent = document.createElement("div");
            TrailerComponent.className = "trailer-component";
            TrailerComponent.id = "trailer-component-" + runningTrailerID;

            let rightNode = movieBlockNode;
            let leftNode = rightNode.previousElementSibling;

            if (leftNode !== null) {
                let rightTop = rightNode.getBoundingClientRect().top;
                let leftTop = leftNode.getBoundingClientRect().top;

                while (rightTop === leftTop) {
                    leftNode = leftNode.previousElementSibling;
                    rightNode = rightNode.previousElementSibling;

                    if (leftNode == null) break;

                    rightTop = rightNode.getBoundingClientRect().top;
                    leftTop = leftNode.getBoundingClientRect().top;
                }
            }

            const movieListElement = document.getElementsByClassName("movie-list")[0];
            movieListElement.insertBefore(TrailerComponent, rightNode);

            ReactDOM.render(
                <Provider store={store}>
                    <Trailer movie={movie} />
                </Provider>,
                document.getElementById(TrailerComponent.id),
            );
        }
    }, [runningTrailerID]);
    //#endregion

    //#region "Move the trailer above the selected row on resize"
    useEffect(() => {
        if (runningTrailerID && runningTrailerID !== "") {
            const trailerNodes = document.getElementsByClassName("trailer-component");
            if (trailerNodes && trailerNodes.length > 0) {
                const TrailerComponent = trailerNodes[0];
                TrailerComponent.parentNode.removeChild(TrailerComponent);

                const movieBlockNode = document.getElementById(runningTrailerID);

                let rightNode = movieBlockNode;
                let leftNode = rightNode.previousElementSibling;

                if (leftNode !== null) {
                    let rightTop = rightNode.getBoundingClientRect().top;
                    let leftTop = leftNode.getBoundingClientRect().top;

                    while (rightTop === leftTop) {
                        leftNode = leftNode.previousElementSibling;
                        rightNode = rightNode.previousElementSibling;

                        if (leftNode === null) break;

                        rightTop = rightNode.getBoundingClientRect().top;
                        leftTop = leftNode.getBoundingClientRect().top;
                    }
                }

                const movieListElement = document.getElementsByClassName("movie-list")[0];
                movieListElement.insertBefore(TrailerComponent, rightNode);
            }
        }
    }, [width]);
    //#endregion

    //#region "Render"
    return (
        <div className="dashboard">
            <AppliedFilters />

            <div className="movie-list">
                {listItems &&
                    listItems.length > 0 &&
                    listItems.map(movie => (
                        <div key={movie.EventCode} id={movie.EventCode}>
                            <Suspense fallback={<div style={{ display: "none" }}></div>}>
                                <MovieCard key={movie.EventCode} movie={movie} />
                            </Suspense>
                        </div>
                    ))}
                {!listItems || (listItems.length == 0 && <div style={{ marginTop: "100px" }}> No data found for the applied filter.</div>)}
            </div>
        </div>
    );
    //#endregion
}

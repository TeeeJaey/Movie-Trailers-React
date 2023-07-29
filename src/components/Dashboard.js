import React, { useEffect, Suspense } from "react";
import ReactDOM from "react-dom";
import { useSelector, Provider } from "react-redux";

import "../styles/Dashboard.css";
import AppliedFilters from "./AppliedFilters";
import { SortBy } from "../utils/Constants";
import useScrollEffect from "../utils/ScrollEffect";
import Trailer from "./Trailer";
import useWindowSize from "../utils/WindowSize.js";
import store from "../store/store";

const MovieCard = React.lazy(() => import("./MovieCard"));

/**
 * The Main Dashboard component - starts below the Header
 * Includes the AppliedFilters component
 * Calls the MovieBlock component for each movie in the movie list
 */
export default function Dashboard() {
    const { width } = useWindowSize();
    const moviesList = useSelector(state => state.moviesList);
    const sortBy = useSelector(state => state.sortBy);
    const languageFilter = useSelector(state => state.languageFilter);
    const genreFilter = useSelector(state => state.genreFilter);
    const runningTrailerID = useSelector(state => state.runningTrailerID);

    // Filtering and Sorting the Movie List
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

        if (sortBy === SortBy.Fresh) {
            filteredMoviesList.sort((a, b) => b.trailerUploadDate - a.trailerUploadDate);
        } else if (sortBy === SortBy.Popular) {
            filteredMoviesList.sort((a, b) => parseInt(b.ratings.wtsCount) - parseInt(a.ratings.wtsCount));
        }
    }

    // Scrolling effect to load and render more movies on scroll
    const listItems = useScrollEffect(filteredMoviesList, [moviesList, sortBy, languageFilter, genreFilter]);

    //Render the trailer node above the selected row
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

    // Move the trailer above the selected row on resize
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

    return (
        <div className="dashboard">
            <AppliedFilters />

            <div className="movie-list">
                {listItems &&
                    listItems.length > 0 &&
                    listItems.map(movie => (
                        <div key={movie.EventCode} id={movie.EventCode}>
                            <Suspense fallback={<div className="display-none"></div>}>
                                <MovieCard key={movie.EventCode} movie={movie} />
                            </Suspense>
                        </div>
                    ))}
                {!listItems || (listItems.length == 0 && <div className="margin-t-100"> No data found for the applied filter.</div>)}
            </div>
        </div>
    );
}

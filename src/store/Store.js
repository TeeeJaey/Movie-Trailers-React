
//#region "Imports"
import { createStore } from "redux";
import Constants from "../utils/Constants.js";
//#endregion

// Default state for our redux store
const defaultState = {
    showingReleasedMovies: false,
    languageList: [],
    moviesList: [],
    sortBy: Constants.SortBy.Popular,
    languageFilter: [],
    genreList: [],
    genreFilter: [],
    runningTrailerID: ""
};

//#region "Get a full list of genres from the moviesData"
function getGenres(moviesData) {
    let genres = [];
    if(!moviesData) 
        return [];

    for(const key in moviesData) {
        let movie = moviesData[key];
        let movieGenres = movie.EventGenre.split('|');
        if(movieGenres && movieGenres.length > 0) {
            movieGenres.forEach(movieGenre => {
                genres.push(movieGenre);
            });
        }
    }
    
    let setGenre = new Set(genres);
    return [...setGenre].sort();
};
//#endregion

//#region "Reducer function for our redux store"
function reducer(state = defaultState, action) 
{
    switch(action.type) 
    {
        // Set the full data which includes list of movies, languages, genres (Run just once on initial load)
        case Constants.StoreActions.SetFullData : {
            let newState = {...state};
            newState.languageList =  [...action.payload.data.languageList];
            let moviesList = [];
            for(const key in action.payload.data.moviesData) {
                let movie = action.payload.data.moviesData[key];
                moviesList.push(movie);
            }
            newState.moviesList =  [...moviesList];

            newState.genreList = getGenres(action.payload.data.moviesData);
            newState.runningTrailerID = "";
            return newState;
        }

        // Set the sortBy field from the first dropdown (Popular or Fresh)
        case Constants.StoreActions.SetSortBy : {
            let newState = {...state};
            newState.sortBy = action.payload.sortBy;
            newState.runningTrailerID = "";
            return newState;
        }
        
        // Set the language filter list from the second dropdown (English, Hindi, Marathi ...)
        case Constants.StoreActions.ToggleLanguageFilter : {
            let newState = {...state};
            newState.languageFilter = [...state.languageFilter];
            newState.runningTrailerID = "";
            if(action.payload.add)
                newState.languageFilter.push(action.payload.filter);
            else
                newState.languageFilter.splice(newState.languageFilter.indexOf(action.payload.filter),1);
            return newState;
        }
        
        // Set the genre filter list from the third dropdown (Action, Comedy, Drama ...)
        case Constants.StoreActions.ToggleGenreFilter : {
            let newState = {...state};
            newState.genreFilter = [...state.genreFilter];
            newState.runningTrailerID = "";
            if(action.payload.add)
                newState.genreFilter.push(action.payload.filter);
            else
                newState.genreFilter.splice(newState.genreFilter.indexOf(action.payload.filter),1);
            return newState;
        }
        
        // Set the showing flag from the two header buttons (Coming Soon or Now showing)
        case Constants.StoreActions.ToggleReleasedMovies : {
            let newState = {...state};
            newState.showingReleasedMovies = action.payload.showing;
            newState.runningTrailerID = "";
            return newState;
        }
        
        // Set the movie ID for the current running trailer and start the trailer (Called when user clicks on any movie card/image)
        case Constants.StoreActions.RunTrailer : {
            let newState = {...state};
            newState.runningTrailerID = action.payload.movieID;
            return newState;
        }
        
        default: {
            return state;
        }
    }
}
//#endregion

//#region "Redux Store"
const store  = createStore(reducer);
export default store;
//#endregion

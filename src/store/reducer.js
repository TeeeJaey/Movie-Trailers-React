import { StoreActions } from "../utils/Constants.js";
import { getLanguages, getGenres } from "../utils/Data.js";

// Default state for our redux store
const defaultState = {
    showingReleasedMovies: false,
    languageList: [],
    moviesList: [],
    sortBy: "Default",
    languageFilter: [],
    genreList: [],
    genreFilter: [],
    runningTrailerID: "",
};

// Reducer function for our redux store
export function reducer(state = defaultState, action) {
    switch (action.type) {
        // Set the full data which includes list of movies, languages, genres (Run just once on initial load)
        case StoreActions.SetFullData: {
            let newState = { ...state };
            newState.languageList = getLanguages(action.payload.data.moviesData);
            let moviesList = [];
            for (const key in action.payload.data.moviesData) {
                let movie = action.payload.data.moviesData[key];
                moviesList.push(movie);
            }
            newState.moviesList = [...moviesList];

            newState.genreList = getGenres(action.payload.data.moviesData);
            newState.runningTrailerID = "";
            return newState;
        }

        // Set the sortBy field from the first dropdown (Popular or Fresh)
        case StoreActions.SetSortBy: {
            let newState = { ...state };
            newState.sortBy = action.payload.sortBy;
            newState.runningTrailerID = "";
            return newState;
        }

        // Set the language filter list from the second dropdown (English, Hindi, Marathi ...)
        case StoreActions.ToggleLanguageFilter: {
            let newState = { ...state };
            newState.languageFilter = [...state.languageFilter];
            newState.runningTrailerID = "";
            if (action.payload.add) newState.languageFilter.push(action.payload.filter);
            else newState.languageFilter.splice(newState.languageFilter.indexOf(action.payload.filter), 1);
            return newState;
        }

        // Set the genre filter list from the third dropdown (Action, Comedy, Drama ...)
        case StoreActions.ToggleGenreFilter: {
            let newState = { ...state };
            newState.genreFilter = [...state.genreFilter];
            newState.runningTrailerID = "";
            if (action.payload.add) newState.genreFilter.push(action.payload.filter);
            else newState.genreFilter.splice(newState.genreFilter.indexOf(action.payload.filter), 1);
            return newState;
        }

        // Set the showing flag from the two header buttons (Coming Soon or Now showing)
        case StoreActions.ToggleReleasedMovies: {
            let newState = { ...state };
            newState.showingReleasedMovies = action.payload.showing;
            newState.runningTrailerID = "";
            return newState;
        }

        // Set the movie ID for the current running trailer and start the trailer (Called when user clicks on any movie card/image)
        case StoreActions.RunTrailer: {
            let newState = { ...state };
            newState.runningTrailerID = action.payload.movieID;
            return newState;
        }

        default: {
            return state;
        }
    }
}

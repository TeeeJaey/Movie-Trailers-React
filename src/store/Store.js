import { createStore } from "redux";
import Constants from "../utils/Constants.js";

const defaultState = {
    showingReleasedMovies: false,
    languageList: [], 
    moviesData: {}, 
    sortBy: Constants.SortBy.Popular,
    languageFilter: [],
    genreList: [],
    genreFilter: []
};

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


function reducer(state = defaultState, action) 
{
    switch(action.type) 
    {
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
            return newState;
        }

        case Constants.StoreActions.SetSortBy : {
            let newState = {...state};
            newState.sortBy = action.payload.sortBy;
            return newState;
        }
        
        case Constants.StoreActions.ToggleLanguageFilter : {
            let newState = {...state};
            newState.languageFilter = [...state.languageFilter];
            if(action.payload.add)
                newState.languageFilter.push(action.payload.filter);
            else
                newState.languageFilter.splice(newState.languageFilter.indexOf(action.payload.filter),1);
            return newState;
        }
        
        case Constants.StoreActions.ToggleGenreFilter : {
            let newState = {...state};
            newState.genreFilter = [...state.genreFilter];
            if(action.payload.add)
                newState.genreFilter.push(action.payload.filter);
            else
                newState.genreFilter.splice(newState.genreFilter.indexOf(action.payload.filter),1);
            return newState;
        }
        
        case Constants.StoreActions.ToggleReleasedMovies : {
            let newState = {...state};
            newState.showingReleasedMovies = action.payload.showing;
            return newState;
        }
        
        default: {
            return state;
        }
    }
}

const store  = createStore(reducer);
export default store;

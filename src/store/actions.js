import { StoreActions } from "../utils/Constants.js";

//export set of action generators function for Redux

export function setFullData(data) {
    const action = {
        type: StoreActions.SetFullData,
        payload: {
            data: data,
        },
    };
    return action;
}

export function setSortBy(sortBy) {
    const action = {
        type: StoreActions.SetSortBy,
        payload: {
            sortBy: sortBy,
        },
    };
    return action;
}

export function toggleLanguageFilter(filter, add) {
    const action = {
        type: StoreActions.ToggleLanguageFilter,
        payload: {
            filter: filter,
            add: add,
        },
    };
    return action;
}

export function toggleGenreFilter(filter, add) {
    const action = {
        type: StoreActions.ToggleGenreFilter,
        payload: {
            filter: filter,
            add: add,
        },
    };
    return action;
}

export function toggleReleasedMovies(showing) {
    const action = {
        type: StoreActions.ToggleReleasedMovies,
        payload: {
            showing: showing,
        },
    };
    return action;
}

export function runTrailer(movieID) {
    const action = {
        type: StoreActions.RunTrailer,
        payload: {
            movieID: movieID,
        },
    };
    return action;
}

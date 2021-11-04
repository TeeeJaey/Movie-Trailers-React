
import Constants from "../Utils/Constants.js";

class Actions
{
    static SetFullData(data) {

        const action = {
            type : Constants.StoreActions.SetFullData,
            payload : {
                data: data
            }
        };
        return action;
    }

    static SetSortBy(sortBy) {

        const action = {
            type : Constants.StoreActions.SetSortBy,
            payload : {
                sortBy: sortBy
            }
        };
        return action;
    }

    static ToggleLanguageFilter(filter, add) {

        const action = {
            type : Constants.StoreActions.ToggleLanguageFilter,
            payload : {
                filter: filter,
                add: add
            }
        };
        return action;
    }

    static ToggleGenreFilter(filter, add) {

        const action = {
            type : Constants.StoreActions.ToggleGenreFilter,
            payload : {
                filter: filter,
                add: add
            }
        };
        return action;
    }

    static ToggleReleasedMovies(showing) {

        const action = {
            type : Constants.StoreActions.ToggleReleasedMovies,
            payload : {
                showing: showing
            }
        };
        return action;
    }
    
}

export default Actions;
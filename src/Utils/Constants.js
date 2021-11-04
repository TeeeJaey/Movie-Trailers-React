
class Constants
{   
    static get StoreActions()
    {
        const StoreActions = {
            SetFullData: "SetFullData",
            SetSortBy:"SetSortBy",
            ToggleLanguageFilter:"ToggleLanguageFilter",
            ToggleGenreFilter:"ToggleGenreFilter",
            ToggleReleasedMovies : "ToggleReleasedMovies"
        };
        return StoreActions;
    }
}

export default Constants;
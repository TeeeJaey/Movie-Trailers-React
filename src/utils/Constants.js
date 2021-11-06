
class Constants
{   
    static get StoreActions()
    {
        const StoreActions = {
            SetFullData: "SetFullData",
            SetSortBy:"SetSortBy",
            ToggleLanguageFilter:"ToggleLanguageFilter",
            ToggleGenreFilter:"ToggleGenreFilter",
            ToggleReleasedMovies : "ToggleReleasedMovies",
            RunTrailer : "RunTrailer"
        };
        return StoreActions;
    }
    static get SortBy()
    {
        const SortBy = {
            Popular: "Popular",
            Fresh:"Fresh"
        };
        return SortBy;
    }
}

export default Constants;
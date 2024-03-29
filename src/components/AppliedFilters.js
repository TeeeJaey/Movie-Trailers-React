import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleGenreFilter, toggleLanguageFilter } from "../store/actions";
import "../styles/AppliedFilters.css";

/**
 * Shows the list of filters that are applied ,
 * each having cross button that will remove that filter
 * Horizontally scrollable if goes beyond the window width
 */
export default function AppliedFilters() {
    const dispatch = useDispatch();
    let languageFilter = useSelector(state => state.languageFilter);
    let genreFilter = useSelector(state => state.genreFilter);

    return (
        <div className="applied-filters">
            <div className="label">Applied Filters: </div>

            <div className="list">
                {languageFilter.map(filter => {
                    return (
                        <div key={filter} className="filter-item">
                            <span> {filter} </span>
                            <span onClick={() => dispatch(toggleLanguageFilter(filter, false))} className="filter-cross">
                                &#x2715;
                            </span>
                        </div>
                    );
                })}

                {genreFilter.map(filter => {
                    return (
                        <div key={filter} className="filter-item">
                            <span> {filter} </span>
                            <span onClick={() => dispatch(toggleGenreFilter(filter, false))} className="filter-cross">
                                &#x2715;
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Store/Actions";
import '../Styles/appliedFilters.css';


export default function AppliedFilters() {
    const dispatch = useDispatch();

    let languageFilter = useSelector(state => state.languageFilter);
    let genreFilter = useSelector(state => state.genreFilter);

    return <div className="applied-filters">
                <div className="label">Applied Filters: </div> 
                <div className="list">
                {languageFilter.map(filter => {
                    return  <div className="filter-item"> 
                                <span> {filter} </span> 
                                <span onClick={()=>dispatch(Actions.ToggleLanguageFilter(filter,false))} 
                                        class="filter-cross" >
                                    &#x2715;
                                </span>
                            </div>;
                })}
                
                {genreFilter.map(filter => {
                    return  <div className="filter-item"> 
                                <span> {filter} </span> 
                                <span onClick={()=>dispatch(Actions.ToggleGenreFilter(filter,false))} 
                                        class="filter-cross" >
                                    &#x2715;
                                </span>
                            </div>;
                })}
                </div>
            </div>;
}


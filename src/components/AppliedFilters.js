import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../store/Actions";
import '../styles/AppliedFilters.css';


export default function AppliedFilters() {
    const dispatch = useDispatch();

    let languageFilter = useSelector(state => state.languageFilter);
    let genreFilter = useSelector(state => state.genreFilter);

    return <div className="applied-filters">
                <div className="label">Applied Filters: </div> 
                
                <div className="list">
                {languageFilter.map(filter => {
                    return  <div key={filter} className="filter-item"> 
                                <span> {filter} </span> 
                                <span onClick={()=>dispatch(Actions.ToggleLanguageFilter(filter,false))} 
                                        className="filter-cross" >
                                    &#x2715;
                                </span>
                            </div>;
                })}
                
                {genreFilter.map(filter => {
                    return  <div key={filter} className="filter-item"> 
                                <span> {filter} </span> 
                                <span onClick={()=>dispatch(Actions.ToggleGenreFilter(filter,false))} 
                                        className="filter-cross" >
                                    &#x2715;
                                </span>
                            </div>;
                })}
                </div>
            </div>;
}


import React, { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../Styles/dashboard.css';


export default function Dashboard() {
    const dispatch = useDispatch();

    let languageFilter = useSelector(state => state.languageFilter);
    let genreFilter = useSelector(state => state.genreFilter);

    return (
        <div className="dashboard">
            <div className="applied-filters">
                <div className="label">Applied Filters: </div> 
                <div className="list">
                {languageFilter.map(filter => {
                    return  <div className="filter-item"> 
                                <span> {filter} </span> 
                                <span class="filter-cross">&#x2715;</span>
                            </div>
                })}
                
                {genreFilter.map(filter => {
                    return  <div className="filter-item"> 
                                <span> {filter} </span> 
                                <span class="filter-cross">&#x2715;</span>
                            </div>
                })}
                </div>
            </div>
        </div>
    );
}

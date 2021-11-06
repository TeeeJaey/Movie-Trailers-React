import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./Dropdown.js";
import Actions from "../store/Actions";
import '../styles/Header.css';

export default function Header() {
    const dispatch = useDispatch();

    const sortBy = useSelector(state => state.sortBy);
    const languageList = useSelector(state => state.languageList);
    const genreList = useSelector(state => state.genreList);
    const showingReleasedMovies = useSelector(state => state.showingReleasedMovies);
    
    let languageFilter = useSelector(state => state.languageFilter);
    let genreFilter = useSelector(state => state.genreFilter);

    if(!languageFilter || languageFilter.length === 0) languageFilter = ["All Languages"];
    if(!genreFilter || genreFilter.length === 0) genreFilter = ["All Genres"];

    return (
        <div className="header">
            <div className="header-item">
                <div className="header-title"> Movie Trailers </div>
                <div style={{display:"flex"}}>
                    <button className={showingReleasedMovies? "btn header-button": "btn header-button active"} 
                            onClick={()=>dispatch(Actions.ToggleReleasedMovies(false))} >coming soon</button>
                    <button className={showingReleasedMovies? "btn header-button active": "btn header-button"} 
                            onClick={()=>dispatch(Actions.ToggleReleasedMovies(true))} >now showing</button>
                </div>
            </div>

            <div className="header-item">
                <Dropdown   label={sortBy} 
                            list={["Popular", "Fresh"]} isFilter={false}
                            select={(x)=>dispatch(Actions.SetSortBy(x))} />
                <Dropdown   label={languageFilter} 
                            list={languageList} isFilter={true}
                            select={(x, add=true)=>dispatch(Actions.ToggleLanguageFilter(x,add))} />
                <Dropdown   label={genreFilter} 
                            list={genreList} isFilter={true}
                            select={(x, add=true)=>dispatch(Actions.ToggleGenreFilter(x,add))} />
            </div>
        </div>
    );
}

import React, { useState } from "react";

export default function Dropdown(props) {
    const [showDropdown, setShowDropdown] = useState("none");
    
    const toggleDropdown = function() {
        if(showDropdown == "none") setShowDropdown("block");
        else setShowDropdown("none");
    };

    if(!props.list)
        props.list = [];
    
    const dropdownList = props.list;

    let dropddownListRender = [];
    dropdownList.forEach((option,i) => {
        dropddownListRender.push(<a key={option+'_'+i} className={"dropdown-item"} onClick={()=>props.select(option)}  > 
                                    <span className="ellipsis"> {option} </span> 
                                </a>);
    });
    

    return <div className="dropdown" style={{marginRight:"5px"}} > 
                <button className="btn btn-danger dropdown-toggle " type="button" onClick={toggleDropdown} >
                    <span className="options-label"> {props.label} </span>
                    <FaCaretDown className="options-icon"/>
                </button>
                
                <div className="dropdown-menu dropdown-menu-right" style={{ cursor:"pointer" , display: showDropdown}} >
                    {dropddownListRender}
                </div>
            </div>;
};
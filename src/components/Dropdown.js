import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

export default function Dropdown(props) {

    if(!props.list)
        props.list = [];
    
    const dropdownList = props.list;

    let dropddownListRender = [];
    dropdownList.forEach((option,i) => {
        let checkboxClass= "dropdown-item-checkbox";
        let add = true;
        if(props.label.includes(option)){
            add = false;
            checkboxClass += " checked"
        }
        dropddownListRender.push(<a key={option+'_'+i} className={"dropdown-item"} onClick={()=>props.select(option,add)}  > 
                                    {props.isFilter && <div className={checkboxClass} /> }
                                    <span className="ellipsis" > {option} </span> 
                                </a>);
    });

    let label = props.label;
    if(props.isFilter && label && label.length > 0)
        label = label.join();

    return <div className="dropdown" > 
                <button className="btn dropdown-btn" type="button">
                    <span className="options-label ellipsis"> {label} </span>
                    <FaCaretDown className="options-icon"/>
                </button>
                
                <div className="dropdown-menu " >
                    {dropddownListRender}
                </div>
            </div>;
};
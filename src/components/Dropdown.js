import React from "react";
import { FaCaretDown } from "react-icons/fa";
import '../Styles/dropdown.css';

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
        dropddownListRender.push(<div key={option+'_'+i} className={"dropdown-item"} onClick={()=>props.select(option,add)}  > 
                                    {props.isFilter && <div className={checkboxClass} > <span>&#10003;</span> </div> }
                                    <span className="ellipsis" > {option} </span> 
                                </div>);
    });

    let label = props.label;
    if(props.isFilter && label && label.length > 0)
        label = label.join();

    return <div className="dropdown" > 
                <button className="btn dropdown-btn" type="button">
                    <span className="dropdown-label ellipsis"> {label} </span>
                    <FaCaretDown className="dropdown-icon"/>
                </button>
                
                <div className="dropdown-menu " >
                    {dropddownListRender}
                </div>
            </div>;
};
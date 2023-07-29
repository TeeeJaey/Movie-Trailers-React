import React from "react";
import { FaCaretDown } from "react-icons/fa";
import "../styles/Dropdown.css";

/**
 * A reusable dropdown component
 * @param label : text
 * @param list : shown in dropdown
 * @param isFilter : bool whether to show checkbox for filters
 * @param select : function to run when clicked on any dropdown item
 */
export default function Dropdown({ label, list = [], isFilter, select }) {
    // Fill up the Dropdown menu as a list of divs
    const dropddownListRender = [];
    list.forEach((option, i) => {
        let checkboxClass = "dropdown-item-checkbox";
        let add = true;
        if (label.includes(option)) {
            add = false;
            checkboxClass += " checked";
        }
        dropddownListRender.push(
            <div key={option + "_" + i} className={"dropdown-item"} onClick={() => select(option, add)}>
                {isFilter && (
                    <div className={checkboxClass}>
                        {" "}
                        <span>&#10003;</span>{" "}
                    </div>
                )}
                <span className="ellipsis"> {option} </span>
            </div>,
        );
    });

    // Set label as ALL or the chosen list
    const renderLabel = isFilter && label && label.length > 0 ? label.join() : label;

    return (
        <div className="dropdown">
            <button className="btn dropdown-btn" type="button">
                <span className="dropdown-label ellipsis"> {renderLabel} </span>
                <FaCaretDown className="dropdown-icon" />
            </button>

            <div className="dropdown-menu ">{dropddownListRender}</div>
        </div>
    );
}

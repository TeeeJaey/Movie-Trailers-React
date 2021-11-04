import React from "react";
import Dropdown from "./Dropdown.js";

export default function Header() {
  return (
    <div className="header">
      <div className="header-item">
        <h4 className="header-title">Movie Trailers</h4>
        <button className="btn header-button active">coming soon</button>
        <button className="btn header-button">now showing</button>
      </div>
      <div className="header-item"></div>
    </div>
  );
}

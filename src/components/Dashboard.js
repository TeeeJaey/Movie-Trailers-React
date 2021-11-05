import React, { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../Styles/dashboard.css';
import AppliedFilters from "./AppliedFilters";


export default function Dashboard() {
    const dispatch = useDispatch();

    return (
        <div className="dashboard">
            <AppliedFilters/>
        </div>
    );
}

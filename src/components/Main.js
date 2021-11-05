import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import config from "../config.json";
import Header from "./Header.js";
import Actions from "../Store/Actions";
import Dashboard from "./Dashboard";

export default function Main() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        axios.get(config.ApiUrl).then((res) => {
        if (res.status === 200) {
            dispatch(Actions.SetFullData(res.data));
        } else console.log("Error " + res.status);
        });
    }, []);

    return (
        <div className="main">
            <Header />
            <Dashboard/>
        </div>
    );
}

import React, { useState , useEffect } from "react";
import axios from "axios";
import config from "../config.json";
import Header from "./Header";

export default function Main() {
  const [languageList, setLanguageList] = useState([]);
  const [moviesData, setMoviesData] = useState({});

  useEffect(() => {
    axios.get(config.ApiUrl).then((res) => {
      if (res.status === 200) {
        if (res.data.languageList && res.data.languageList.length > 0) {
          setLanguageList(res.data.languageList);
          console.log(languageList);
        }
        if (res.data.moviesData && res.data.moviesData.length > 0)
          setMoviesData(res.data.moviesData);
      } else console.log("Error " + res.status);
    });
  }, []);

  return (
    <div className="main">
      <Header />
      <ul>
        Language List
        {languageList && languageList.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    </div>
  );
}

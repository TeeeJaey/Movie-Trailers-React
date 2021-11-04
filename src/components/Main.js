import React from "react";
import Header from "./Header";
const axios = require("axios");

const ApiUrl = "https://peaceful-forest-62260.herokuapp.com/";

export default function Main() {
  const [languageList, setLanguageList] = React.useState([]);
  const [moviesData, setMoviesData] = React.useState({});

  React.useEffect(() => {
    axios.get(ApiUrl).then((res) => {
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

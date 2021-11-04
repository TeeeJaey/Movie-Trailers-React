import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Main from "./components/Main.js";

ReactDOM.render(
  <StrictMode>
    <Main />
  </StrictMode>,
  document.getElementById("root")
);

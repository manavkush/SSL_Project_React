import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const loader = document.querySelector(".loader-wrapper");

const showLoader = () => loader.classList.remove("loader--hide");
const hideLoader = () => loader.classList.add("loader--hide");

ReactDOM.render(
  <BrowserRouter>
    <App hideLoader={hideLoader} showLoader={showLoader} />
  </BrowserRouter>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import './App.css'
import App from "./App";

const loader = document.querySelector('.loader-wrapper');

const showLoader = () => loader.classList.remove("loader--hide");
const hideLoader = () => loader.classList.add("loader--hide");

ReactDOM.render(<App hideLoader={hideLoader} showLoader={showLoader} />, document.getElementById("root"));

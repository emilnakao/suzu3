import * as React from "react";
import * as ReactDOM from "react-dom";

import { Home } from "./components/Home";
import "./theme/main.less";



ReactDOM.render(
    <Home compiler="TypeScript" framework="React" />,
    document.getElementById("app-container")
);

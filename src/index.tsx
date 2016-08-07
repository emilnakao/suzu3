import * as React from "react";
import * as ReactDOM from "react-dom";

import { Home } from "./components/Home";
import { Sidebar } from "./components/Sidebar";

import "./theme/main.less";



ReactDOM.render(
    <div className="app-container row">
      <Sidebar/>
      <Home compiler="TypeScript" framework="React" />
    </div>
    ,
    document.getElementById("app-container")
);

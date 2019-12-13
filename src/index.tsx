import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Link, hashHistory } from "react-router";

import { Home } from "./components/Home";
import { CheckIn}  from "./components/CheckIn";
import { Sidebar } from "./components/Sidebar";

import "./theme/main.less";

const App = React.createClass({
  render() {
    return (
      <div className="app-container">
        <Sidebar/>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
})


ReactDOM.render(
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="checkin" component={CheckIn}/>
        </Route>
      </Router>
    ,
    document.getElementById("app-container")
);

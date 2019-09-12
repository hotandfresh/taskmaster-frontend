import React, { Component, Fragment } from "react";
import "./app.scss";
import Tasks from "./Tasks";
import Nav from "./Nav";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <Tasks />
      </Fragment>
    );
  }
}

export default App;

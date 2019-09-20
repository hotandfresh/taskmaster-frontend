import React, { Component, Fragment } from "react";
import "./app.scss";
import Tasks from "./Tasks";
import Nav from "./Nav";
import Form from "./Form";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <Form />
        <Tasks />
      </Fragment>
    );
  }
}

export default App;

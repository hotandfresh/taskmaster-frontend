import React, { Component, Fragment } from "react";
import "./app.scss";
import Tasks from "./Tasks";
import Nav from "./Nav";
// http://taskmaster-dev.us-east-1.elasticbeanstalk.com/api/v1
// http://taskmaster-env.3nz9fretef.us-west-2.elasticbeanstalk.com/

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

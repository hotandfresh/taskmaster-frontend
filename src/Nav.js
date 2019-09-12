import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <Fragment>
        <nav>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>

            <Link to="/News">
              <li>News</li>
            </Link>
            <Link to="/About">
              <li>About</li>
            </Link>
          </ul>
        </nav>
      </Fragment>
    );
  }
}

export default Nav;

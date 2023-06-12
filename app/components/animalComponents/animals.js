import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Header from "../layoutComponents/headerComponent/Header";

class Animal extends Component {
  render() {
    return (
      <React.Fragment>
        <header id="header" className="col-md-12">
          <Header />
        </header>
        <div id="container-all" className="wrap col-md-12">
          <div className="clearfix"></div>
          <div id="content" className="row">
            <div id="sectionCentral" className="col-md-10">
              <Outlet />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Animal;

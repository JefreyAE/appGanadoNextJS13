import React, {Component} from "react";
import {Outlet, Link} from "react-router-dom";
import Header from "../layoutComponents/headerComponent/Header";

class Main extends Component {

    state = {
        notificaciones: ""
    }

    render() {
        return (
            <React.Fragment>
                <header id="header" className="col-md-12">
                    <Header/>
                </header>
                <h1>Modulo Main</h1>
                <Outlet/>
            </React.Fragment>
        );
    }
}

export default Main;

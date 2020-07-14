import React, { Component } from "react";

const appVersion = require("electron").remote.app.getVersion();

class HomePage extends Component {
    render() {
        return (
            <div role="main" className="text-center w-100 vh-100 jumbotron">
                <h1 className="cover-heading">
                    <b>SUZU</b>3<small>alfa</small>
                </h1>
                <p className="lead">Aplicação para controle de presenças</p>
                <p className="lead">Versão {appVersion}</p>
            </div>
        );
    }
}

export default HomePage;

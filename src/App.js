import Popper from 'popper.js'; // eslint-disable-line no-unused-vars
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCheck, faMapMarkerAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import Home from "./pages/Home";
import SelfCheckIn from "./pages/SelfCheckIn";
import Okiyome from "./pages/Okiyome";

function App() {
  return (
    <Router>
            <div className={"w-100 vh-100 d-flex flex-column"}>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    {/* Logo */}
                    <a className="navbar-brand" href="/"><b>SUZU</b>3</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Links */}
                    <div className="collapse navbar-collapse" id="navbarLinkSection">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/"><FontAwesomeIcon icon={faHome}/> Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin">Admin</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/selfCheckIn"><FontAwesomeIcon icon={faCheck}/> Marcar Presenças</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/okiyome"><FontAwesomeIcon icon={faCheck}/> Okiyome</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="operationDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Operações</a>
                                <div className="dropdown-menu" aria-labelledby="operationDropdown">
                                    {/*<a className="dropdown-item" href="/">Atualização de Cadastro</a>*/}
                                    {/*<a className="dropdown-item" href="/">Atualização de Núcleo</a>*/}
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="operationDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Relatórios</a>
                                <div className="dropdown-menu" aria-labelledby="operationDropdown">
                                    {/*<a className="dropdown-item" href="#">Presenças por Evento</a>*/}
                                    {/*<a className="dropdown-item" href="#">Presenças por Kumite</a>*/}
                                    {/*<a className="dropdown-item" href="#">Presenças por Mi-Kumite</a>*/}
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Session Info */}
                    <div className="float-right" id="navbarSessionSection">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="regionalDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FontAwesomeIcon icon={faMapMarkerAlt}/> Pinheiros</a>
                                <div className="dropdown-menu" aria-labelledby="regionalDropdown">
                                    <a className="dropdown-item" href="/">Trocar Regional</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FontAwesomeIcon icon={faUserAlt}/> Admin</a>
                                <div className="dropdown-menu" aria-labelledby="userDropdown">
                                    <a className="dropdown-item" href="/logout">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                </nav>
                <div className="flex-fill d-flex ">
                    <Route exact path="/" component={Home} />
                    <Route exact path="/selfCheckIn" component={SelfCheckIn} />
                    <Route exact path="/okiyome" component={Okiyome} />
                </div>
            </div>

        </Router>
  );
}

export default App;

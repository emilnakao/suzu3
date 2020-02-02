import Popper from "popper.js"; // eslint-disable-line no-unused-vars
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faCheck,
    faMapMarkerAlt,
    faUserAlt
} from "@fortawesome/free-solid-svg-icons";
import HomePage from "./pages/HomePage";
import SelfCheckInPage from "./pages/SelfCheckInPage";
import Okiyome from "./pages/Okiyome";
import AdminPage from "./pages/AdminPage";
import PresenceService from "./services/PresenceService";

const { useReducer, useState } = React;

/**
 * Starting point for the entire application.
 *
 * @author emil
 */
function App() {
    // contextualização
    const [currentEvent, setCurrentEvent] = useState({
        id: 2,
        event_type: {
            id: 2,
            name: "Dia Normal"
        },
        begin_date_time: "2020-03-20 00:00:00"
    });

    const [currentEventPresences, dispatchPresenceAction] = useReducer(
        presenceReducer,
        {
            list: []
        }
    );

    /**
     * When the event is selected, fetches the presences from the db.
     */
    useEffect(() => {
        PresenceService.findContextPresences(currentEvent.id).then(response => {
            dispatchPresenceAction({
                type: "init",
                list: response.docs || []
            });
        });
    }, [currentEvent]);

    function presenceReducer(state, action) {
        switch (action.type) {
            case "init":
                return { list: action.list };
            case "add":
                let newPresence = PresenceService.savePresence(action.person);
                state.list.push(newPresence);
                return { list: state.list };
            case "remove":
                let newList = state.list.filter(elem => {
                    return elem.person.id !== action.person.id;
                });
                state.list = newList;
                return state;
            default:
                return state;
        }
    }

    return (
        <Router>
            <div className={"w-100 vh-100 d-flex flex-column"}>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    {/*Logo*/}
                    <a className="navbar-brand" href="/">
                        <b>SUZU</b>3
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarsExampleDefault"
                        aria-controls="navbarsExampleDefault"
                        aria-expanded="false"
                        aria-label="Togglenavigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/*Links*/}
                    <div
                        className="collapse navbar-collapse"
                        id="navbarLinkSection"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">
                                    <FontAwesomeIcon icon={faHome} />
                                    Home
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin">
                                    Admin
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/selfCheckIn">
                                    <FontAwesomeIcon icon={faCheck} />
                                    Marcar Presenças
                                </a>
                            </li>
                            {/*<liclassName="nav-item"><aclassName="nav-link"href="/okiyome"><FontAwesomeIconicon={faCheck}/>Okiyome</a></li>*/}
                            <li className="nav-item">
                                <a className="nav-link" href="/admin">
                                    <FontAwesomeIcon icon={faCheck} />
                                    Admin
                                </a>
                            </li>
                            {/*<liclassName="nav-itemdropdown">*/}
                            {/*<aclassName="nav-linkdropdown-toggle"href="/"id="operationDropdown"data-toggle="dropdown"aria-haspopup="true"aria-expanded="false">Operações</a>*/}
                            {/*<divclassName="dropdown-menu"aria-labelledby="operationDropdown">*/}
                            {/*<aclassName="dropdown-item"href="/">AtualizaçãodeCadastro</a>*/}
                            {/*<aclassName="dropdown-item"href="/">AtualizaçãodeNúcleo</a>*/}
                            {/*</div>*/}
                            {/*</li>*/}
                            {/*<liclassName="nav-itemdropdown">*/}
                            {/*<aclassName="nav-linkdropdown-toggle"href="/"id="operationDropdown"data-toggle="dropdown"aria-haspopup="true"aria-expanded="false">Relatórios</a>*/}
                            {/*<divclassName="dropdown-menu"aria-labelledby="operationDropdown">*/}
                            {/*<aclassName="dropdown-item"href="#">PresençasporEvento</a>*/}
                            {/*<aclassName="dropdown-item"href="#">PresençasporKumite</a>*/}
                            {/*<aclassName="dropdown-item"href="#">PresençasporMi-Kumite</a>*/}
                            {/*</div>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </nav>
                <div className="flex-fill d-flex">
                    <Route exact path="/" component={HomePage} />
                    <Route
                        exact
                        path="/selfCheckIn"
                        render={props => (
                            <SelfCheckInPage
                                {...props}
                                presenceList={currentEventPresences.list}
                                dispatchPresenceAction={dispatchPresenceAction}
                            />
                        )}
                    />
                    {/* <Route exactpath="/okiyome" component={Okiyome} /> */}
                    <Route exact path="/admin" component={AdminPage} />
                </div>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;

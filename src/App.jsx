import { faCheck, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useEffect } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import SelfCheckInPage from "./pages/SelfCheckInPage";
import { presenceRepository } from "./services/ApplicationContext";
import PersonPage from "./pages/PersonPage";
import PresenceByPersonReportPage from "./pages/PresenceByPersonReportPage";
import PresenceByDayReportPage from "./pages/PresenceByDayReportPage";

const { useReducer, useState } = React;

/**
 * Starting point for the entire application.
 *
 * @author emil
 */
function App() {
    // contextualização
    const [currentEvent, setCurrentEvent] = useState(undefined);

    const [currentEventPresences, dispatchPresenceAction] = useReducer(
        presenceReducer,
        {
            list: [],
            lastPresence: undefined,
        }
    );

    /**
     * When the event is selected, fetches the presences from the db.
     */
    useEffect(() => {
        if (!currentEvent) {
            return;
        }

        presenceRepository.findEventPresences(currentEvent).then((response) => {
            dispatchPresenceAction({
                type: "init",
                list: response.docs || [],
            });
        });
    }, [currentEvent, currentEventPresences.lastPresence]);

    function presenceReducer(state, action) {
        switch (action.type) {
            case "init":
                console.log(
                    `Nova lista de presença: ${JSON.stringify(action.list)}`
                );
                return { ...state, list: action.list };
            case "add":
                let newPresence = presenceRepository.savePresence({
                    person: action.person,
                    isFirstTime: action.isFirstTime,
                    event: currentEvent,
                });

                return { ...state, lastPresence: newPresence };
            case "remove":
                let newList = state.list.filter((elem) => {
                    if (!elem.person) {
                        return true; // ignores wrong data
                    }

                    return elem.person._id !== action.presence.person._id;
                });

                presenceRepository.removePresence(action.presence);

                return { ...state, list: newList };
            default:
                return state;
        }
    }

    return (
        <Router>
            <div className={"w-100 vh-100 d-flex flex-column"}>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    {/*Logo*/}
                    <div className="navbar-brand">
                        <b>SUZU</b>3
                    </div>
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
                                <Link className="nav-link" to="/">
                                    <FontAwesomeIcon icon={faHome} />
                                    &nbsp; Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/selfCheckIn">
                                    <FontAwesomeIcon icon={faCheck} />
                                    &nbsp; Marcar Presenças
                                </Link>
                            </li>
                            {/*<liclassName="nav-item"><aclassName="nav-link"href="/okiyome"><FontAwesomeIconicon={faCheck}/>Okiyome</a></li>*/}

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="/"
                                    id="operationDropdown"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Admin
                                </a>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="operationDropdown"
                                >
                                    <Link className="dropdown-item" to="/admin">
                                        Importações Excel
                                    </Link>
                                    <Link
                                        className="dropdown-item"
                                        to="/person"
                                    >
                                        Cadastro de Pessoas
                                    </Link>
                                    <Link
                                        className="dropdown-item"
                                        to="/presenceByPersonReport"
                                    >
                                        Relatório de Presenças por Pessoa
                                    </Link>
                                    <Link
                                        className="dropdown-item"
                                        to="/presenceByDayReport"
                                    >
                                        Relatório de Presenças por Dia
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="flex-fill d-flex">
                    <Route exact path="/" component={HomePage} />
                    <Route
                        path="/selfCheckIn"
                        render={(props) => (
                            <SelfCheckInPage
                                {...props}
                                presenceRepository
                                eventTypeRepository
                                eventRepository
                                personRepository
                                presenceList={currentEventPresences.list}
                                dispatchPresenceAction={(action) => {
                                    dispatchPresenceAction(action);
                                }}
                                currentEvent={currentEvent}
                                setCurrentEvent={(event) => {
                                    console.log("App.jsx chamado:" + event);
                                    setCurrentEvent(event);
                                }}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/admin"
                        component={withRouter(AdminPage)}
                    />
                    <Route exact path="/person" component={PersonPage} />
                    <Route
                        exact
                        path="/presenceByPersonReport"
                        component={PresenceByPersonReportPage}
                    />
                    <Route
                        exact
                        path="/presenceByDayReport"
                        component={PresenceByDayReportPage}
                    />
                </div>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;

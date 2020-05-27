import { faCheck, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import SelfCheckInPage from "./pages/SelfCheckInPage";
import PresenceRepository from "./services/PresenceRepository";
import PersonPage from "./pages/PersonPage";
import NotificationService from "./services/NotificationService";

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

        PresenceRepository.findEventPresences(currentEvent).then((response) => {
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
                let newPresence = PresenceRepository.savePresence({
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

                PresenceRepository.removePresence(action.presence);

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
                                <a className="nav-link" href="/selfCheckIn">
                                    <FontAwesomeIcon icon={faCheck} />
                                    Marcar Presenças
                                </a>
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
                                    <a className="dropdown-item" href="/admin">
                                        Importações Excel
                                    </a>
                                    <a className="dropdown-item" href="/person">
                                        Pessoas
                                    </a>
                                </div>
                            </li>
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
                        render={(props) => (
                            <SelfCheckInPage
                                {...props}
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
                    {/* <Route exactpath="/okiyome" component={Okiyome} /> */}
                    <Route exact path="/admin" component={AdminPage} />
                    <Route exact path="/person" component={PersonPage} />
                </div>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

function PresenceListWidget({ presenceList = [] }) {
    const kumiteLabel = "PRATICANTE";
    const mikumiteLabel = "CONVIDADO";
    const firstTimeLabel = "1a VEZ";
    const mtaiLabel = "MTAI";

    const isTrue = (value) => {
        return (
            value !== undefined &&
            (value === true || value === "true" || value === "t")
        );
    };

    const countKumite = () => {
        return presenceList.filter((p) => {
            if (!p.person) {
                return false;
            }

            return !isTrue(p.person.isMiKumite);
        }).length;
    };

    const countMtai = () => {
        return presenceList.filter((p) => {
            if (!p.person) {
                return false;
            }

            return isTrue(p.person.isMtai);
        }).length;
    };

    const countMiKumite = () => {
        return presenceList.filter((p) => {
            if (!p.person) {
                return false;
            }

            return isTrue(p.person.isMiKumite) && !isTrue(p.isFirstTime);
        }).length;
    };

    const countFirstTime = () => {
        return presenceList.filter((p) => {
            if (!p.person) {
                return false;
            }

            return isTrue(p.isFirstTime);
        }).length;
    };

    const getPersonCssClass = (presence) => {
        if (!presence) {
            return undefined;
        }

        if (presence.isFirstTime) {
            return "first-time-color";
        }

        if (presence.person && presence.person.isMiKumite) {
            return "mikumite-color";
        }

        if (presence.person && presence.person.isMtai) {
            return "mtai-color";
        }

        return "kumite-color";
    };

    return (
        <div className="card my-2 flex-fill">
            <h5 className="card-header">Presenças: {presenceList.length} </h5>
            <div className="py-1">
                <div className="d-flex flex-row m-1">
                    <div className="m-1 rounded kumite-background-color presence-counter-box">
                        <div className="presence-counter">{countKumite()}</div>
                        <div className="presence-label">{kumiteLabel}</div>
                    </div>
                    <div className="m-1 rounded mtai-background-color presence-counter-box">
                        <div className="presence-counter">{countMtai()}</div>
                        <div className="presence-label">{mtaiLabel}</div>
                    </div>
                    <div className="m-1 rounded mikumite-background-color presence-counter-box">
                        <div className="presence-counter">
                            {countMiKumite()}
                        </div>
                        <div className="presence-label">{mikumiteLabel}</div>
                    </div>
                    <div className="m-1 rounded first-time-background-color presence-counter-box">
                        <div className="presence-counter">
                            {countFirstTime()}
                        </div>
                        <div className="presence-label">{firstTimeLabel}</div>
                    </div>
                </div>
                <table className="table table-striped table-hover table-sm ">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Nome</td>
                        </tr>
                    </thead>
                    <tbody>
                        {presenceList.map(function (presence, idx) {
                            return (
                                <tr>
                                    <td className="ml-3">{idx + 1}</td>
                                    <td>
                                        <FontAwesomeIcon
                                            icon={faCircle}
                                            className={
                                                getPersonCssClass(presence) +
                                                " mr-2"
                                            }
                                        />
                                        {presence.person &&
                                            presence.person.name}

                                        <br />
                                        <small>
                                            Registrado{" "}
                                            {moment(
                                                presence.registrationDateTime
                                            ).fromNow()}
                                        </small>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PresenceListWidget;

import React from "react";

function PresenceListWidget({ presenceList = [] }) {
    const kumiteLabel = "PRATICANTE";
    const mikumiteLabel = "CONVIDADO";
    const firstTimeLabel = "1a VEZ";
    const mtaiLabel = "MTAI";

    const countKumite = () => {
        return presenceList.filter(p => {
            if (!p.person) {
                return false;
            }

            return !p.person.is_mikumite;
        }).length;
    };

    const countMtai = () => {
        return presenceList.filter(p => {
            if (!p.person) {
                return false;
            }

            return p.person.is_mtai;
        }).length;
    };

    const countMiKumite = () => {
        return presenceList.filter(p => {
            if (!p.person) {
                return false;
            }

            return p.person.is_mikumite;
        }).length;
    };

    const countFirstTime = () => {
        return presenceList.filter(p => {
            if (!p.person) {
                return false;
            }

            return p.person.is_mikumite;
        }).length;
    };

    return (
        <div className="card my-2 flex-fill">
            <h5 className="card-header">Presenças: {presenceList.length} </h5>
            <div className="py-1">
                <div className="d-flex flex-row m-1">
                    <div
                        className="m-1 rounded"
                        style={{
                            height: "80px",
                            backgroundColor: "#428bca",
                            flexBasis: "100%"
                        }}
                    >
                        <div className="presence-counter">{countKumite()}</div>
                        <div className="presence-label">{kumiteLabel}</div>
                    </div>
                    <div
                        className="m-1 rounded"
                        style={{
                            height: "80px",
                            backgroundColor: "#2b542c",
                            flexBasis: "100%"
                        }}
                    >
                        <div className="presence-counter">{countMtai()}</div>
                        <div className="presence-label">{mtaiLabel}</div>
                    </div>
                    <div
                        className="m-1 rounded"
                        style={{
                            height: "80px",
                            backgroundColor: "#5cb85c",
                            flexBasis: "100%"
                        }}
                    >
                        <div className="presence-counter">
                            {countMiKumite()}
                        </div>
                        <div className="presence-label">{mikumiteLabel}</div>
                    </div>
                    <div
                        className="m-1 rounded"
                        style={{
                            height: "80px",
                            backgroundColor: "#d9534f",
                            flexBasis: "100%"
                        }}
                    >
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
                        {presenceList.map(function(presence, idx) {
                            return (
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>
                                        {presence.person &&
                                            presence.person.name}
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

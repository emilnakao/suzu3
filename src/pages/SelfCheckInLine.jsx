import { faCheck, faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";

function SelfCheckInLine({
    person,
    isFocused,
    presenceList,
    dispatchPresenceAction,
}) {
    const handleConfirmPresence = (e) => {
        toast.info("Presença confirmada para " + person.name);
        dispatchPresenceAction({
            type: "add",
            person: person,
        });
    };

    const handleCancelPresence = (e) => {
        toast.info("Presença cancelada para " + person.name);
        dispatchPresenceAction({
            type: "remove",
            presence: findPersonPresence(),
        });
    };

    const isCancelPresenceDisabled = () => {
        return findPersonPresence() === undefined;
    };

    const findPersonPresence = () => {
        let candidates = presenceList.filter((elem) => {
            if (!elem.person) {
                return false;
            }

            return elem.person._id === person._id;
        });

        if (candidates.length > 0) {
            return candidates[0];
        } else {
            return undefined;
        }
    };

    return (
        <div
            key={person.name}
            className={
                "suzu-checkin-row rounded " + (isFocused ? "highlight" : "")
            }
        >
            <h4>{person.name}</h4>

            <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleCancelPresence}
                disabled={isCancelPresenceDisabled()}
            >
                <FontAwesomeIcon icon={faMinusSquare} className="text-danger" />{" "}
                Cancelar Presença
            </button>
            <button
                className="suzu-checkin-row-presencebtn btn btn-success float-right my-auto"
                onClick={handleConfirmPresence}
                disabled={!isCancelPresenceDisabled()}
            >
                <FontAwesomeIcon icon={faCheck} /> Marcar Presença
            </button>
        </div>
    );
}

export default SelfCheckInLine;

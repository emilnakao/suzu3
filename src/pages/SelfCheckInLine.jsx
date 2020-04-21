import {
    faCheck,
    faMinusSquare,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
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
        toast.info("Presença confirmada para " + JSON.stringify(person));
        dispatchPresenceAction({
            type: "add",
            person: person,
        });
    };

    const handleCancelPresence = (e) => {
        toast.info("Presença cancelada para " + JSON.stringify(person));
        dispatchPresenceAction({
            type: "remove",
            presence: findPersonPresence(),
        });
    };

    const handleStartPersonEdit = (e) => {
        toast.info("Iniciando edição para " + JSON.stringify(person));
    };

    const isCancelPresenceDisabled = () => {
        return findPersonPresence() === undefined;
    };

    const findPersonPresence = () => {
        let candidates = presenceList.filter((elem) => {
            if (!elem.person) {
                return false;
            }

            return elem.person.id === person.id;
        });

        if (candidates.length > 0) {
            return candidates[0];
        } else {
            return undefined;
        }
    };

    return (
        <div
            className={
                "suzu-checkin-row rounded " + (isFocused ? "highlight" : "")
            }
        >
            <h4>{person.name}</h4>
            <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleStartPersonEdit}
            >
                <FontAwesomeIcon icon={faPencilAlt} className="text-warning" />{" "}
                Corrigir Cadastro
            </button>
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

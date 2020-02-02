import React, { useState, useEffect, useCallback } from "react";
import TodayEventWidget from "../components/TodayEventWidget";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import PresenceListWidget from "../components/PresenceListWidget";

import { HotKeys } from "react-hotkeys";
import PresenceService from "../services/PresenceService";
import { useInput } from "../hooks/useInput";
import { useAsync } from "../hooks/useAsync";
import SelfCheckInLine from "./SelfCheckInLine";

/**
 * Screen where the user searches for his name, and toggles his presence in the current event.
 *
 * It's the main screen of the App, implementing an attendance book functionality.
 */
function SelfCheckInPage({ presenceList, dispatchPresenceAction }) {
    /**
     * Hook for person name search input
     */
    const { value: personSearchToken, bind: bindPersonSearchToken } = useInput(
        ""
    );

    /**
     * For usage with keyboard arrows up/down
     */
    const { focusIndex, updateFocusIndex } = useState(0);

    /**
     * List of name suggestions according to what the user types.
     */
    const personList = useAsync([
        PresenceService.findPerson,
        personSearchToken
    ]);

    /**
     * Keyboard shortcuts
     * @see https://github.com/greena13/react-hotkeys
     */
    const keyMap = {
        MOVE_ROW_FOCUS_UP: "up",
        MOVE_ROW_FOCUS_DOWN: "down",
        CONFIRM: "enter"
    };

    const moveRowFocusUp = useCallback(
        event => {
            let maxFocusIndex = personList.length;
            let newFocusIndex =
                focusIndex + 1 < maxFocusIndex
                    ? focusIndex + 1
                    : maxFocusIndex - 1;
            updateFocusIndex(newFocusIndex);
        },
        [focusIndex, updateFocusIndex, personList]
    );

    const moveRowFocusDown = useCallback(
        event => {
            let newFocusIndex = focusIndex - 1 < 0 ? 0 : focusIndex - 1;
            updateFocusIndex(newFocusIndex);
        },
        [focusIndex, updateFocusIndex]
    );

    const handlers = {
        MOVE_ROW_FOCUS_UP: moveRowFocusUp,
        MOVE_ROW_FOCUS_DOWN: moveRowFocusDown
    };

    return (
        <HotKeys
            keyMap={keyMap}
            handlers={handlers}
            role="main"
            className="container-fluid d-flex flex-fill bg-dark"
        >
            <div className="flex-fill d-flex flex-row">
                <div className="col-3 mr-n2 flex-fill d-flex flex-column">
                    <TodayEventWidget />
                    <PresenceListWidget presenceList={presenceList} />
                </div>
                <div className="flex-fill d-flex">
                    <div className="card mt-2 mb-2 mx-2 flex-fill">
                        <h5 className="card-header">
                            <FontAwesomeIcon icon={faCheck} /> Marcar Presenças{" "}
                        </h5>
                        <div className="card-body">
                            <input
                                id={"selfCheckinNameSearchInput"}
                                type="text"
                                className="form-control form-control-lg mb-2"
                                placeholder="Digite seu nome aqui"
                                autoFocus={true}
                                {...bindPersonSearchToken}
                            />

                            {/* Caso nenhuma sugestão tenha sido encontrada, mostra msg */}
                            {(!personList || personList.length === 0) && (
                                <div>
                                    <div className="text-center v-100">
                                        <i>
                                            Não encontrou seu nome? Aperte Enter
                                            para cadastrar.
                                        </i>
                                    </div>
                                </div>
                            )}

                            {/* Lista de opções de nomes */}
                            {personList &&
                                personList.map(function(person, index) {
                                    return (
                                        <SelfCheckInLine
                                            person={person}
                                            isFocused={index === focusIndex}
                                            presenceList={presenceList}
                                            dispatchPresenceAction={
                                                dispatchPresenceAction
                                            }
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </HotKeys>
    );
}

export default SelfCheckInPage;

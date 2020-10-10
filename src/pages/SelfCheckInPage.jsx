import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { HotKeys } from "react-hotkeys";
import CreatePersonModal from "../components/CreatePersonModal";
import PresenceListWidget from "../components/PresenceListWidget";
import TodayEventWidget from "../components/TodayEventWidget";
import { useAsync } from "../hooks/useAsync";
import useDebounce from "../hooks/useDebounce";
import { useInput } from "../hooks/useInput";
import SelfCheckInLine from "./SelfCheckInLine";
import { personRepository } from "../services/ApplicationContext";

/**
 * Screen where the user searches for his name, and toggles his presence in the current event.
 *
 * It's the main screen of the App, implementing an attendance book functionality.
 */
function SelfCheckInPage({
    presenceList,
    dispatchPresenceAction,
    setCurrentEvent,
    currentEvent,
}) {
    /**
     * Hook for person name search input
     */
    const { value: personSearchToken, bind: bindPersonSearchToken } = useInput(
        ""
    );

    /**
     * Avoids querying for each character typed.
     */
    const debouncedSearchTerm = useDebounce(personSearchToken, 500);

    /**
     * For usage with keyboard arrows up/down
     */
    const [focusIndex, setFocusIndex] = useState(0);

    /**
     * List of name suggestions according to what the user types.
     */
    const [personList, loadingPersonList] = useAsync([
        personRepository.findPerson,
        debouncedSearchTerm,
    ]);

    const [showCreatePersonModal, setShowCreatePersonModal] = useState(false);

    /**
     * Keyboard shortcuts
     * @see https://github.com/greena13/react-hotkeys
     */
    const keyMap = {
        MOVE_ROW_FOCUS_UP: "up",
        MOVE_ROW_FOCUS_DOWN: "down",
        CONFIRM: "enter",
    };

    const moveRowFocusDown = function () {
        let newFocusIndex = focusIndex + 1;
        let maxFocusIndex = personList.length;

        if (newFocusIndex >= maxFocusIndex) {
            newFocusIndex = maxFocusIndex - 1;
        }

        console.log(`KeyDown: focusIndex ${newFocusIndex}`);
        setFocusIndex(newFocusIndex);
    };

    const moveRowFocusUp = function () {
        let newFocusIndex = focusIndex - 1 < 0 ? 0 : focusIndex - 1;
        console.log(`KeyUp: focusIndex ${newFocusIndex}`);
        setFocusIndex(newFocusIndex);
    };

    /**
     * Handler for Enter press. The action triggered depends on the current page state.
     *
     */
    const confirmAction = function () {
        if (!currentEvent) {
            return;
        }

        // No person found. Should register a new one.
        if (!personList || personList.length === 0) {
            setShowCreatePersonModal(true);
        }
        // The person was here before. Just confirms/cancel his presence.
        else {
            let focusedPerson = personList[focusIndex];
            dispatchPresenceAction({
                type: "add",
                person: focusedPerson,
                isFirstTime: false,
            });
        }
    };

    /**
     * Maps keys to handler functions. Required parameter for the react-hotkeys component.
     */
    const handlers = {
        MOVE_ROW_FOCUS_UP: moveRowFocusUp,
        MOVE_ROW_FOCUS_DOWN: moveRowFocusDown,
        CONFIRM: confirmAction,
    };

    /**
     *
     * @param {person, isFirstTime}
     */
    const handleNewPresence = async ({ person, isFirstTime }) => {
        let savedPerson = person;

        if (!person._id) {
            console.log(
                "A new person was registered. Saving before confirming presence."
            );
            savedPerson = await personRepository.save(person);
        }

        dispatchPresenceAction({
            type: "add",
            person: savedPerson,
            isFirstTime: isFirstTime,
        });
    };

    return (
        <HotKeys
            keyMap={keyMap}
            handlers={handlers}
            role="main"
            className="container-fluid d-flex flex-fill bg-dark"
        >
            <div className="flex-fill d-flex flex-row">
                <div className="col-4 mr-n2 flex-fill d-flex flex-column">
                    <TodayEventWidget
                        currentEvent={currentEvent}
                        setCurrentEvent={(event) => {
                            console.log("SelfCheckInPage chamado");
                            setCurrentEvent(event);
                        }}
                    />
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
                                disabled={!currentEvent}
                                {...bindPersonSearchToken}
                            />

                            {/* Case when no event is selected */}
                            {!currentEvent && (
                                <div>
                                    <div className="text-center v-100">
                                        <i>
                                            Crie um evento para o dia de hoje,
                                            ou selecione um existente.
                                        </i>
                                    </div>
                                </div>
                            )}

                            {/* Caso nenhuma sugestão tenha sido encontrada, mostra msg */}
                            {currentEvent &&
                                (!personList || personList.length === 0) && (
                                    <div>
                                        <div className="text-center v-100">
                                            <i>
                                                Não encontrou seu nome? Aperte
                                                Enter para cadastrar.
                                            </i>
                                        </div>
                                    </div>
                                )}

                            {/* Carregando lista de pessoas */}
                            {loadingPersonList && (
                                <div>
                                    <div className="text-center v-100">
                                        <FontAwesomeIcon
                                            icon={faSpinner}
                                            spin
                                        />{" "}
                                        Carregando...
                                    </div>
                                </div>
                            )}

                            {/* Lista de opções de nomes */}
                            {!loadingPersonList &&
                                personList &&
                                personList.map(function (person, index) {
                                    if (person) {
                                        return (
                                            <SelfCheckInLine
                                                key={index}
                                                person={person}
                                                isFocused={index === focusIndex}
                                                presenceList={presenceList}
                                                dispatchPresenceAction={
                                                    dispatchPresenceAction
                                                }
                                            />
                                        );
                                    } else {
                                        return undefined;
                                    }
                                })}
                        </div>
                    </div>
                </div>
            </div>
            <CreatePersonModal
                show={showCreatePersonModal}
                nameSuggestion={personSearchToken}
                handleClose={() => {
                    setShowCreatePersonModal(false);
                }}
                handleConfirm={(args) => {
                    handleNewPresence(args);
                }}
            />
        </HotKeys>
    );
}

export default SelfCheckInPage;

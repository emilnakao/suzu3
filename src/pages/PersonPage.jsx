import {
    faEdit,
    faSave,
    faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Async from "react-select/async";
import CreatePersonModal from "../components/CreatePersonModal";
import { useAsync } from "../hooks/useAsync";
import useDebounce from "../hooks/useDebounce";
import { useInput } from "../hooks/useInput";
import { HanRepository } from "../services/HanRepository";
import NotificationService from "../services/NotificationService";
import PersonRepository from "../services/PersonRepository";

/**
 * Screen to manage person registries
 */
function PersonPage() {
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

    const [editIndex, setEditIndex] = useState(undefined);

    /**
     * List of name suggestions according to what the user types.
     */
    const personList = useAsync([
        PersonRepository.findPerson,
        debouncedSearchTerm,
    ]);

    /**
     * Feedback for async operations
     */
    const [loading, setLoading] = useState(false);

    const [showCreatePersonModal, setShowCreatePersonModal] = useState(false);

    return (
        <React.Fragment>
            <div className="flex-fill d-flex">
                <div className="card mt-2 mb-2 mx-2 flex-fill">
                    <h5 className="card-header">
                        <FontAwesomeIcon icon={faUserFriends} /> Pessoas{" "}
                    </h5>
                    <div className="card-body">
                        <div className="form-inline">
                            <input
                                id={"selfCheckinNameSearchInput"}
                                type="text"
                                className="form-control form-control-lg mb-2"
                                placeholder="Digite seu nome aqui"
                                autoFocus={true}
                                {...bindPersonSearchToken}
                            />
                            <button
                                className="form-control form-control-lg btn btn-primary ml-2"
                                type="button"
                                onClick={() => {
                                    setShowCreatePersonModal(true);
                                }}
                            >
                                Novo...
                            </button>
                        </div>

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <td>Nome</td>
                                    <td>Kumite?</td>
                                    <td>Mahikari-tai?</td>
                                    <td>Han</td>
                                    <td>Última Atualização</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Lista de opções de nomes */}
                                {personList &&
                                    personList.map(function (person, index) {
                                        if (person && !(index === editIndex)) {
                                            return (
                                                <tr>
                                                    <td>{person.name}</td>
                                                    <td>
                                                        {!person.isMiKumite}
                                                    </td>
                                                    <td>{person.isMtai}</td>
                                                    <td>{person.han}</td>
                                                    <td>
                                                        {person.updateDateTime}
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="form-control btn btn-sm btn-secondary"
                                                            onClick={() => {
                                                                setEditIndex(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        } else if (index === editIndex) {
                                            return (
                                                <tr>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            value={person.name}
                                                        />
                                                    </td>
                                                    <td>
                                                        {!person.isMiKumite}
                                                    </td>
                                                    <td>{person.isMtai}</td>
                                                    <td>
                                                        <Async
                                                            loadOptions={
                                                                HanRepository.findAll
                                                            }
                                                        />{" "}
                                                    </td>
                                                    <td>
                                                        {person.updateDateTime}
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="form-control btn btn-sm btn-primary"
                                                            onClick={() => {
                                                                setEditIndex(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faSave}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        } else {
                                            return undefined;
                                        }
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <CreatePersonModal
                show={showCreatePersonModal}
                nameSuggestion={personSearchToken}
                handleClose={() => {
                    setShowCreatePersonModal(false);
                }}
                handleConfirm={({ person }) => {
                    setLoading(true);
                    PersonRepository.save(person).then(() => {
                        setLoading(false);
                        NotificationService.success(
                            "Novo registro criado com sucesso"
                        );
                    });
                }}
            />
        </React.Fragment>
    );
}

export default PersonPage;

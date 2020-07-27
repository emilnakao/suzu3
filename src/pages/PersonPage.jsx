import {
    faEdit,
    faSave,
    faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import CreatePersonModal from "../components/CreatePersonModal";
import { useAsync } from "../hooks/useAsync";
import useDebounce from "../hooks/useDebounce";
import { useInput } from "../hooks/useInput";
import NotificationService from "../services/NotificationService";
import moment from "moment";
import {
    hanRepository,
    personRepository,
} from "../services/ApplicationContext";

/**
 * Screen to manage person registries
 */
function PersonPage() {
    const { value: personSearchToken, bind: bindPersonSearchToken } = useInput(
        ""
    );

    /**
     * Avoids querying for each character typed.
     */
    const debouncedSearchTerm = useDebounce(personSearchToken, 500);

    const [editIndex, setEditIndex] = useState(undefined);

    const [hanList, setHanList] = useState([]);

    useEffect(() => {
        hanRepository.findAll().then((response) => {
            setHanList(response.docs);
        });

        personRepository.countPerson().then((response) => {
            setTotalPersonCount(response);
        });
    }, []);

    /**
     * List of name suggestions according to what the user types.
     */
    const personList = useAsync([
        personRepository.findPerson,
        debouncedSearchTerm,
    ]);

    const [loading, setLoading] = useState(false);

    const [showCreatePersonModal, setShowCreatePersonModal] = useState(false);

    const [totalPersonCount, setTotalPersonCount] = useState(0);

    return (
        <React.Fragment>
            <div className="flex-fill d-flex">
                <div className="card mt-2 mb-2 mx-2 flex-fill">
                    <h5 className="card-header">
                        <FontAwesomeIcon icon={faUserFriends} /> Pessoas (Total
                        de registros: {totalPersonCount} )
                    </h5>
                    <div className="card-body">
                        <div className="form-inline">
                            <input
                                id={"selfCheckinNameSearchInput"}
                                type="text"
                                className="form-control w-50 mb-2"
                                placeholder="Digite seu nome aqui"
                                autoFocus={true}
                                {...bindPersonSearchToken}
                            />
                            <button
                                className=" btn btn-primary ml-2 mb-2"
                                type="button"
                                onClick={() => {
                                    setShowCreatePersonModal(true);
                                }}
                            >
                                Novo...
                            </button>
                        </div>

                        {/*  TODO: show loading properly */}
                        {loading && <span className="loading" />}

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
                                                        <input
                                                            type="checkbox"
                                                            className="form-control"
                                                            checked={
                                                                !person.isMiKumite
                                                            }
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            className="form-control"
                                                            checked={
                                                                person.isMtai
                                                            }
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td>
                                                        {person.han
                                                            ? person.han.name
                                                            : "Não Definido"}
                                                    </td>
                                                    <td>
                                                        {`${moment(
                                                            person.updateDateTime
                                                        ).format(
                                                            "DD/MM/YYYY HH:mm:ss"
                                                        )}`}
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-secondary"
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
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                person.name =
                                                                    event.target.value;
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            className="form-control"
                                                            defaultChecked={
                                                                !person.isMiKumite
                                                            }
                                                            onChange={() => {
                                                                person.isMiKumite = !person.isMiKumite;
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            className="form-control"
                                                            defaultChecked={
                                                                person.isMtai
                                                            }
                                                            onChange={() => {
                                                                person.isMtai = !person.isMtai;
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Select
                                                            defaultValue={
                                                                person.han
                                                            }
                                                            onChange={(
                                                                newValue
                                                            ) => {
                                                                person.han = newValue;
                                                            }}
                                                            options={hanList}
                                                            placeholder={"Han"}
                                                            isClearable={true}
                                                            isOptionSelected={
                                                                false
                                                            }
                                                            getOptionLabel={(
                                                                option
                                                            ) => option.name}
                                                        />{" "}
                                                    </td>
                                                    <td>
                                                        {`${person.updateDateTime}`}
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="form-control btn btn-sm btn-primary"
                                                            onClick={() => {
                                                                setLoading(
                                                                    true
                                                                );
                                                                personRepository
                                                                    .update(
                                                                        person
                                                                    )
                                                                    .finally(
                                                                        () => {
                                                                            setLoading(
                                                                                false
                                                                            );
                                                                            setEditIndex(
                                                                                undefined
                                                                            );
                                                                        }
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
                    personRepository.save(person).then(() => {
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

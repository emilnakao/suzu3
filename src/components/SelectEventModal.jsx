import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "react-day-picker/lib/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { eventRepository } from "../services/ApplicationContext";
import DatePicker from "./DatePicker";
import EventTypeSelect from "./EventTypeSelect";

export default function SelectEventModal({
    id,
    show,
    handleSelect,
    handleClose,
}) {
    /**
     * Event Type for event search
     */
    const [eventType, setEventType] = useState(undefined);

    /**
     * Date for event search
     */
    const [date, setDate] = useState(new Date());

    /**
     * Search result
     */
    const [eventList, setEventList] = useState([]);

    const [loading, setLoading] = useState(false);

    const [pristine, setPristine] = useState(true);

    const handleChangeEventType = (selectedOption) => {
        setEventType(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };

    const handleSearch = async () => {
        setLoading(true);
        setPristine(false);
        let eventTypeId = eventType ? eventType.id : undefined;
        let events = await eventRepository.findEvents(date, eventTypeId);
        setLoading(false);
        setEventList(events.docs);
    };

    const handleSelectEvent = (event) => {
        handleSelect(event);
        handleClose();
    };

    return (
        <Modal show={show} id={id} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Selecionar Evento</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="row">
                    <div className="col">
                        <EventTypeSelect
                            defaultValue={eventType}
                            onChange={handleChangeEventType}
                        />
                    </div>
                    <div className="col">
                        <DatePicker
                            value={date}
                            onChange={(date) => {
                                setDate(date);
                            }}
                        />
                    </div>
                </div>
            </Modal.Body>
            {loading && (
                <div className="text-center pb-2">
                    <FontAwesomeIcon icon={faSpinner} spin /> Carregando...
                </div>
            )}
            {!loading && pristine && (
                <div className="text-center pb-2">
                    Clique em <b>Buscar</b> para selecionar um evento que já foi
                    criado.
                    <p>
                        Você pode buscar apenas pela data, apenas pelo tipo, ou
                        por ambos.
                    </p>
                </div>
            )}
            {!loading &&
                !pristine &&
                (!eventList || eventList.length === 0) && (
                    <div className="text-center pb-2">
                        Não foram encontrados resultados.
                    </div>
                )}
            {!loading && eventList && eventList.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Evento</td>
                            <td>Data</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {eventList.map(function (event, idx) {
                            return (
                                <tr key={idx}>
                                    <td>{event.eventType.name}</td>
                                    <td>{event.date}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => {
                                                handleSelectEvent(event);
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="text-info"
                                            />{" "}
                                            Selecionar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={handleClose}
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSearch}
                    disabled={!date && !eventType}
                >
                    Buscar
                </button>
            </Modal.Footer>
        </Modal>
    );
}

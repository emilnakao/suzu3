import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import eventTypeService from "../services/EventTypeRepository";
import eventService from "../services/EventRepository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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

    const [eventTypeList, setEventTypeList] = useState([]);

    /**
     * Date for event search
     */
    const [date, setDate] = useState(new Date());

    /**
     * Search result
     */
    const [eventList, setEventList] = useState([]);

    const handleChangeEventType = (selectedOption) => {
        setEventType(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };

    const handleSearch = async () => {
        let eventTypeId = eventType ? eventType.id : undefined;
        let events = await eventService.findEvents(date, eventTypeId);
        setEventList(events.docs);
        console.log(`Eventos encontrados: ${JSON.stringify(events)}`);
    };

    const handleSelectEvent = (event) => {
        console.log(`Evento selecionado: ${JSON.stringify(event)}`);
        handleSelect(event);
        handleClose();
    };

    useEffect(() => {
        eventTypeService.findAll().then((response) => {
            setEventTypeList(response.docs);
        });
    }, []);

    return (
        <Modal show={show} id={id} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Selecionar Evento</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="row">
                    <div className="col">
                        <Select
                            defaultValue={eventType}
                            onChange={handleChangeEventType}
                            options={eventTypeList}
                            placeholder={"Tipo de Evento"}
                            isClearable={true}
                            getOptionLabel={(option) => option.name}
                        />
                    </div>
                    <div className="col">
                        <DayPickerInput
                            value={date}
                            todayButton="Hoje"
                            locale="pt"
                            className={"form-control"}
                            dayPickerProps={{
                                locale: "pt",
                                format: "DD/MM/YYYY",
                            }}
                            onDayChange={setDate}
                            inputProps={{ className: "form-control" }}
                        />
                    </div>
                </div>
            </Modal.Body>
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
                            <tr>
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

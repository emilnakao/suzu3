import React, { useState, useEffect } from "react";
import Select from "react-select";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import eventTypeService from "../services/EventTypeService";
import eventService from "../services/EventService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function SelectEventModal({ id, handleSelect }) {
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

    const handleChangeEventType = selectedOption => {
        setEventType(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };

    const handleSearch = async () => {
        let eventTypeId = eventType ? eventType.id : undefined;
        let events = await eventService.findEvents(date, eventTypeId);
        setEventList(events.docs);
        console.log(`Eventos encontrados: ${JSON.stringify(events)}`);
    };

    const handleSelectEvent = event => {
        console.log(`Evento selecionado: ${JSON.stringify(event)}`);
        handleSelect(event);
    };

    useEffect(() => {
        eventTypeService.findAll().then(response => {
            setEventTypeList(response.docs);
        });
    }, []);

    return (
        <div
            className="modal fade"
            id={id}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="createEventModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createEventModalLabel">
                            Selecionar Evento
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <Select
                                    value={eventType}
                                    onChange={handleChangeEventType}
                                    options={eventTypeList}
                                    placeholder={"Tipo de Evento"}
                                    getOptionLabel={option => option.name}
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
                                        format: "DD/MM/YYYY"
                                    }}
                                    onDayChange={setDate}
                                    inputProps={{ className: "form-control" }}
                                />
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Evento</td>
                                <td>Data</td>
                                <td></td>
                            </tr>
                        </thead>
                        {eventList.map(function(event, idx) {
                            return (
                                <tr>
                                    <td>{event.event_type.name}</td>
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
                    </table>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
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
                    </div>
                </div>
            </div>
        </div>
    );
}

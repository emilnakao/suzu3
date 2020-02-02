import React, { Component, useEffect, useState } from "react";
import Select from "react-select";
import EventTypeService from "../services/EventTypeService";
import EventService from "../services/EventService";
import { toast } from "react-toastify";

/**
 *
 * @param {*} param0
 */
export default function CreateEventModal({ id, handleCreate }) {
    /**
     * Event Type for event search
     */
    const [eventType, setEventType] = useState(undefined);

    const [eventTypeList, setEventTypeList] = useState([]);

    const handleChange = selectedOption => {
        setEventType(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };

    const handleConfirmCreate = async e => {
        let event = await EventService.findOrCreateEventToday(eventType);
        console.log(`CreateEventModal: salvou ${event}`);
        handleCreate(event);
        toast.success(
            `${eventType.name} para o dia de hoje criado com sucesso!`
        );
    };

    /**
     * Loads the event type list when the screen loads.
     *
     * This method is executed once.
     */
    useEffect(() => {
        EventTypeService.findAll().then(result => {
            setEventTypeList(result.docs);
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
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createEventModalLabel">
                            Criar Evento
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
                        <Select
                            value={eventType}
                            onChange={handleChange}
                            options={eventTypeList}
                            placeholder={"Selecione o tipo de evento"}
                            getOptionLabel={option => option.name}
                        />
                    </div>
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
                            onClick={handleConfirmCreate}
                            disabled={!eventType}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

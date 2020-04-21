import React, { useState } from "react";
import CreateEventModal from "./CreateEventModal";
import SelectEventModal from "./SelectEventModal";
import EventFormatter from "../utils/EventFormatter";

export default function TodayEventWidget({ currentEvent, setCurrentEvent }) {
    const [currentEventName, setCurrentEventName] = useState(
        "Evento não selecionado"
    );

    const [currentEventDate, setCurrentEventDate] = useState(
        EventFormatter.formatEventDate(currentEvent)
    );

    const [showCreateEventModal, setShowCreateEventModal] = useState(false);
    const [showSelectEventModal, setShowSelectEventModal] = useState(false);

    const selectEvent = (event) => {
        console.log(`TodayEventWidget chamado ${JSON.stringify(event)}`);
        setCurrentEvent(event);
        setCurrentEventName(event.eventType.name);
        setCurrentEventDate(EventFormatter.formatEventDate(event));
    };

    return (
        <div className="card my-2">
            <h5 className="card-header">Evento </h5>
            <div className="card-body text-center">
                <h5 className="card-title">{currentEventName}</h5>
                <p className="card-text">{currentEventDate}</p>
            </div>
            <div className="card-footer">
                <button
                    className="btn-sm btn-outline-dark float-left"
                    onClick={() => {
                        setShowSelectEventModal(true);
                    }}
                >
                    Escolher Evento
                </button>
                <button
                    className="btn-sm btn-outline-dark float-right"
                    onClick={() => {
                        setShowCreateEventModal(true);
                    }}
                >
                    Criar Evento
                </button>
            </div>
            <CreateEventModal
                id={"createEventModal"}
                handleCreate={(event) => selectEvent(event)}
                show={showCreateEventModal}
                handleClose={() => setShowCreateEventModal(false)}
            />
            <SelectEventModal
                id={"selectEventModal"}
                handleSelect={(event) => {
                    selectEvent(event);
                }}
                show={showSelectEventModal}
                handleClose={() => setShowSelectEventModal(false)}
            />
        </div>
    );
}

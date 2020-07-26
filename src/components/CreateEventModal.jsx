import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";

import { eventRepository } from "../services/ApplicationContext";
import EventTypeSelect from "./EventTypeSelect";
import NotificationService from "../services/NotificationService";

export default function CreateEventModal({
    id,
    show,
    handleCreate,
    handleClose,
}) {
    const [eventType, setEventType] = useState(undefined);

    const handleChange = (selectedOption) => {
        setEventType(selectedOption);
    };

    const handleConfirmCreate = async (e) => {
        let event = await eventRepository.findOrCreateEventToday(eventType);
        handleCreate(event);
        handleClose();
        NotificationService.success(
            `${eventType.name} para o dia de hoje criado com sucesso!`
        );
    };

    return (
        <Modal show={show} id={id} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Criar Evento</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group controlId="nomeInput"></Form.Group>
                <EventTypeSelect
                    handleChange={handleChange}
                    value={eventType}
                />
            </Modal.Body>

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
                    onClick={handleConfirmCreate}
                    disabled={!eventType}
                >
                    Salvar
                </button>
            </Modal.Footer>
        </Modal>
    );
}

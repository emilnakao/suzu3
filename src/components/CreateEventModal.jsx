import React, { useState } from "react";
import { Modal, Form, Col } from "react-bootstrap";

import { eventRepository } from "../services/ApplicationContext";
import EventTypeSelect from "./EventTypeSelect";
import NotificationService from "../services/NotificationService";
import DatePicker from "./DatePicker";
import { formatDate } from "../utils/StringUtils";

export default function CreateEventModal({
    id,
    show,
    handleCreate,
    handleClose,
}) {
    const [eventType, setEventType] = useState(undefined);
    const [date, setDate] = useState(new Date());

    const handleChange = (selectedOption) => {
        setEventType(selectedOption);
    };

    const handleConfirmCreate = async (e) => {
        let event = await eventRepository.findOrCreateEvent(date, eventType);
        handleCreate(event);
        handleClose();
        NotificationService.success(
            `${eventType.name} para o dia ${formatDate(
                date
            )} criado com sucesso!`
        );
    };

    return (
        <Modal show={show} id={id} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Criar Evento</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Row>
                    <Col sm={8}>
                        <EventTypeSelect
                            onChange={handleChange}
                            value={eventType}
                        />
                    </Col>
                    <Col sm={4}>
                        <DatePicker value={date} onChange={setDate} />
                    </Col>
                </Form.Row>
                <div className="text-center pb-2 pt-2">
                    Selecione um <b>Tipo de evento</b> e uma <b>data</b>, e em
                    seguida clique em <b>Salvar</b>. <br />
                    Você pode também criar eventos em dias passados caso precise
                    registrar em atrasado.
                </div>
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
                    disabled={!eventType || !date}
                >
                    Salvar
                </button>
            </Modal.Footer>
        </Modal>
    );
}

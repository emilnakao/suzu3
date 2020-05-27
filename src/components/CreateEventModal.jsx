import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import Select from "react-select";
import EventTypeRepository from "../services/EventTypeRepository";
import EventRepository from "../services/EventRepository";
import { toast } from "react-toastify";

/**
 *
 * @param {*} param0
 */
export default function CreateEventModal({
    id,
    show,
    handleCreate,
    handleClose,
}) {
    /**
     * Event Type for event search
     */
    const [eventType, setEventType] = useState(undefined);

    const [eventTypeList, setEventTypeList] = useState([]);

    const handleChange = (selectedOption) => {
        setEventType(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };

    const handleConfirmCreate = async (e) => {
        let event = await EventRepository.findOrCreateEventToday(eventType);
        console.log(`CreateEventModal: salvou ${event}`);
        handleCreate(event);
        handleClose();
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
        EventTypeRepository.findAll().then((result) => {
            setEventTypeList(result.docs);
        });
    }, []);

    return (
        <Modal show={show} id={id} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Criar Evento</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group controlId="nomeInput">
                    <Select
                        defaultValue={eventType}
                        onChange={handleChange}
                        isClearable={true}
                        options={eventTypeList}
                        placeholder={"Selecione o tipo de evento"}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option}
                    />
                </Form.Group>
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

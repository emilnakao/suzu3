import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

/**
 *
 */
export default function CreatePersonModal({
    id,
    show,
    nameSuggestion,
    handleClose,
    handleConfirm
}) {
    const [name, setName] = useState(nameSuggestion);
    const [presenceType, setPresenceType] = useState("kumite");
    const [isMtai, setIsMtai] = useState(false);

    const onConfirm = event => {
        toast.info(`Nome: ${name}, ${presenceType}, ${isMtai}`);
        handleConfirm({
            person: {
                name: name || nameSuggestion,
                isKumite: presenceType === "kumite",
                isMtai: isMtai
            },
            firstTime: presenceType === "firstTime"
        });
        handleClose();
    };

    return (
        <Modal show={show} id={id} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Registrar Pessoa</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group controlId="nomeInput">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o nome"
                        defaultValue={nameSuggestion}
                        onChange={e => {
                            setName(e.target.value);
                        }}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="praticanteSelect">
                    <Form.Label>Você é</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={e => {
                            setPresenceType(e.target.value);
                        }}
                        value={presenceType}
                    >
                        <option value="kumite">Praticante</option>
                        <option value="firstTime">Convidado (1a vez)</option>
                        <option value="miKumite">
                            Convidado (já veio outras vezes)
                        </option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="mtaiSelect">
                    <Form.Label>Faz parte do Mahikari-tai?</Form.Label>
                    <Form.Control
                        as="select"
                        value={isMtai}
                        onChange={e => {
                            setIsMtai(e.target.value);
                        }}
                    >
                        <option value="false">Não</option>
                        <option value="true">Sim</option>
                    </Form.Control>
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
                    onClick={onConfirm}
                >
                    Salvar
                </button>
            </Modal.Footer>
        </Modal>
    );
}

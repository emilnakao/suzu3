import React from "react";
import CreateEventModal from "../CreateEventModal";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import {
    eventTypeRepository,
    eventRepository,
} from "../../services/ApplicationContext";

const EVENT_TYPE_SELECT = "Selecione o Tipo de Evento";
const MODAL_TITLE = "Criar Evento";

jest.mock("../../services/ApplicationContext", () => {
    return {
        eventTypeRepository: {
            findAll: jest.fn(() => {
                return Promise.resolve({
                    docs: [
                        {
                            id: "1",
                            docType: "eventType",
                            name: "Cerimônia Mensal",
                        },
                        {
                            id: "2",
                            docType: "eventType",
                            name: "Dia Normal",
                        },
                    ],
                });
            }),
        },
        eventRepository: {
            findOrCreateEvent: jest.fn(() => {
                return Promise.resolve();
            }),
        },
    };
});

it("Renders without crashing", () => {
    render(<CreateEventModal show={true} />);
    expect(screen.queryByText(MODAL_TITLE)).toBeInTheDocument();
});

it("Does not render if show is false", () => {
    render(<CreateEventModal show={false} />);
    expect(screen.queryByText(MODAL_TITLE)).not.toBeInTheDocument();
});

xit("Shows all event types in a select", async () => {
    const createHandler = jest.fn();
    render(
        <CreateEventModal
            show={true}
            handleCreate={createHandler}
            handleClose={jest.fn()}
        />
    );

    await waitFor(() => expect(eventTypeRepository.findAll).toHaveBeenCalled());

    fireEvent.keyDown(screen.queryByLabelText(EVENT_TYPE_SELECT), {
        key: "ArrowDown",
    });

    expect(screen.queryByText("Cerimônia Mensal")).toBeInTheDocument();
    expect(screen.queryByText("Dia Normal")).toBeInTheDocument();
});

it("Closes modal when user cancels", () => {
    const closeHandler = jest.fn();
    render(<CreateEventModal show={true} handleClose={closeHandler} />);
    expect(screen.queryByText(MODAL_TITLE)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancelar"));
    expect(closeHandler).toHaveBeenCalled();
});

xit("Calls handleCreate when user confirms and closes modal", async () => {
    const createHandler = jest.fn();
    const closeHandler = jest.fn();
    render(
        <CreateEventModal
            show={true}
            handleCreate={createHandler}
            handleClose={closeHandler}
        />
    );

    await waitFor(() =>
        expect(eventTypeRepository.findAll).toHaveBeenCalledTimes(1)
    );

    fireEvent.keyDown(screen.queryByLabelText(EVENT_TYPE_SELECT), {
        key: "ArrowDown",
    });

    await screen.findByText("Dia Normal");
    fireEvent.click(screen.getByText("Dia Normal"));

    fireEvent.click(screen.getByText("Salvar"));
    await waitFor(() =>
        expect(eventRepository.findOrCreateEvent).toHaveBeenCalledTimes(1)
    );

    expect(createHandler).toHaveBeenCalledTimes(1);
    expect(closeHandler).toHaveBeenCalledTimes(1);
});

xit("Shows confirm button disabled when no event type is selected", async () => {
    const createHandler = jest.fn();
    const closeHandler = jest.fn();
    render(
        <CreateEventModal
            show={true}
            handleCreate={createHandler}
            handleClose={closeHandler}
        />
    );

    await waitFor(() =>
        expect(eventTypeRepository.findAll).toHaveBeenCalledTimes(1)
    );

    expect(screen.getByText("Salvar")).toBeDisabled();
});

it("Shows confirm button disabled when no date is selected", () => {});
it("Calls handleCreate with correct data when called more than one time in a row", () => {});

afterEach(() => {
    jest.clearAllMocks();
});

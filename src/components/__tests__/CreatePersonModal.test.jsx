import React from "react";
import "@testing-library/jest-dom";

import { render, fireEvent, screen } from "@testing-library/react";
import CreatePersonModal from "../CreatePersonModal";

jest.mock("pouchdb");

it("opens with the name suggestion set in the name field", () => {
    render(<CreatePersonModal show={true} nameSuggestion="Max" />);

    expect(screen.getByLabelText(/nome/i)).toHaveValue("Max");
});

it("sets the mtai flag", () => {
    const onConfirmMock = jest.fn();
    const onCloseMock = jest.fn();
    render(
        <CreatePersonModal
            show={true}
            nameSuggestion="Max"
            handleClose={onCloseMock}
            handleConfirm={onConfirmMock}
        />
    );

    fireEvent.change(screen.getByLabelText(/Mahikari/i), {
        target: {
            value: "true",
        },
    });

    fireEvent.click(screen.getByText(/Salvar/i));

    expect(onConfirmMock.mock.calls[0][0]["person"]["isMtai"]).toEqual(true);
});

it("cleans up last edited data", () => {});

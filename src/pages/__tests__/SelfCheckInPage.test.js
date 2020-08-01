import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import SelfCheckInPage from "../SelfCheckInPage";

jest.mock("pouchdb");

it("renders without crashing", () => {
    const div = document.createElement("div");
    act(() => {
        ReactDOM.render(<SelfCheckInPage />, div);
    });
    ReactDOM.unmountComponentAtNode(div);
});

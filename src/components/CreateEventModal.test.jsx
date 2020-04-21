import React from "react";
import ReactDOM from "react-dom";
import CreateEventModal from "./CreateEventModal";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CreateEventModal />, div);
    ReactDOM.unmountComponentAtNode(div);
});

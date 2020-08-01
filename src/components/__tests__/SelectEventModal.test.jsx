import React from "react";
import ReactDOM from "react-dom";
import SelectEventModal from "../SelectEventModal";

it("renders without crashing", async () => {
    const div = document.createElement("div");
    ReactDOM.render(<SelectEventModal />, div);
    ReactDOM.unmountComponentAtNode(div);
});

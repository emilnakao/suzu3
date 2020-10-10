import React from "react";
import moment from "moment";

export default function TimePicker({ value, onChange }) {
    const handleChange = (value) => {
        let timeValidator = moment(value, "HH:mm");

        if (timeValidator.isValid()) {
            onChange(value);
        }
    };

    return (
        <input
            value={value}
            type={"time"}
            onChange={handleChange}
            className={"form-control"}
            width={"100px"}
        />
    );
}

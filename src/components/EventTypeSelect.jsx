import React, { useEffect, useState } from "react";
import Select from "react-select";
import { eventTypeRepository } from "../services/ApplicationContext";

export default function EventTypeSelect({ value, defaultValue, onChange }) {
    const [eventTypeList, setEventTypeList] = useState([]);

    useEffect(() => {
        eventTypeRepository.findAll().then((result) => {
            setEventTypeList(result.docs);
            console.log("loaded:" + result.docs);
        });
    }, []);

    return (
        <Select
            data-testid="eventTypeSelect"
            aria-label="Selecione o Tipo de Evento"
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            isClearable={true}
            options={eventTypeList}
            placeholder={"Selecione o tipo de evento"}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option}
        />
    );
}

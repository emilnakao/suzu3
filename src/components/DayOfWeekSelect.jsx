import React from "react";
import Select from "react-select";

export default function DayOfWeekSelect({ value, defaultValue, onChange }) {
    return (
        <Select
            data-testid="dayOfWeekSelect"
            aria-label="Selecione o Dia da Semana"
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            isClearable={true}
            options={[
                { value: "1", label: "Segunda" },
                { value: "2", label: "Terça" },
                { value: "3", label: "Quarta" },
                { value: "4", label: "Quinta" },
                { value: "5", label: "Sexta" },
                { value: "6", label: "Sábado" },
                { value: "7", label: "Domingo" },
            ]}
            placeholder={"Selecione o dia da semana"}
            getOptionValue={(option) => option}
            getOptionLabel={(option) => option.label}
        />
    );
}

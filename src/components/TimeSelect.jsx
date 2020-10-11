import React from "react";
import Select from "react-select";

export default function TimeSelect({ value, onChange, defaultValue }) {
    return (
        <Select
            data-testid="timeSelect"
            aria-label="Selecione"
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            isClearable={true}
            styles={{
                container: (provided) => ({
                    ...provided,
                    width: "150px",
                }),
            }}
            options={[
                { value: "06:00", label: "06:00" },
                { value: "07:00", label: "07:00" },
                { value: "08:00", label: "08:00" },
                { value: "09:00", label: "09:00" },
                { value: "10:00", label: "10:00" },
                { value: "11:00", label: "11:00" },
                { value: "12:00", label: "12:00" },
                { value: "13:00", label: "13:00" },
                { value: "14:00", label: "14:00" },
                { value: "15:00", label: "15:00" },
                { value: "16:00", label: "16:00" },
                { value: "17:00", label: "17:00" },
                { value: "18:00", label: "18:00" },
                { value: "19:00", label: "19:00" },
                { value: "20:00", label: "20:00" },
                { value: "21:00", label: "21:00" },
                { value: "22:00", label: "22:00" },
            ]}
            placeholder={"Selecione"}
            getOptionValue={(option) => option}
            getOptionLabel={(option) => option.label}
        />
    );
}

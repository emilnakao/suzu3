import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate } from "../utils/StringUtils";
import MomentLocaleUtils from "react-day-picker/moment";
import "moment/locale/pt";

export default function DatePicker({ value, onChange }) {
    return (
        <DayPickerInput
            value={value}
            todayButton="Hoje"
            className={"form-control"}
            dayPickerProps={{
                locale: "pt-br",
                localeUtils: MomentLocaleUtils,
            }}
            formatDate={formatDate}
            onDayChange={onChange}
            inputProps={{ className: "form-control" }}
        />
    );
}

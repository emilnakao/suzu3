import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import PresenceRepository from "../services/PresenceRepository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { getPersonCssClassFromPresence } from "../utils/CssClassProvider";
import useSortableData from "../hooks/useSortableData";

/**
 *
 * @param {*} props
 */
function PresenceByPersonReportPage(props) {
    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const [presenceList, setPresenceList] = useState([]);

    const { items, requestSort } = useSortableData(presenceList);

    const handleSearch = async () => {
        PresenceRepository.findPresencesByInterval({
            startDate: startDate,
            endDate: endDate,
        }).then((response) => {
            let groupedResponse = response.docs || [];
            let counts = groupedResponse.reduce((accumulator, currentValue) => {
                let name = currentValue.person.name;

                if (!accumulator.hasOwnProperty(name)) {
                    accumulator[name] = {
                        count: 0,
                        person: currentValue.person,
                    };
                }

                accumulator[name].count++;

                return accumulator;
            }, {});

            groupedResponse = Object.keys(counts).map((k) => {
                let person = counts[k].person;
                let hanName = person.han && person.han.name;
                return {
                    name: person.name,
                    hanName: hanName,
                    person: person,
                    count: counts[k].count,
                };
            });

            setPresenceList(groupedResponse);
        });
    };

    return (
        <div role="main" className="w-100 vh-100 jumbotron">
            <div className="col-md-12">
                <h1>Presenças por Pessoa</h1>
                <div className="row">
                    <div className="col">
                        <DayPickerInput
                            value={startDate}
                            todayButton="Hoje"
                            locale="pt"
                            className={"form-control"}
                            dayPickerProps={{
                                locale: "pt",
                                format: "DD/MM/YYYY",
                            }}
                            onDayChange={setStartDate}
                            inputProps={{ className: "form-control" }}
                        />
                        &nbsp; a &nbsp;
                        <DayPickerInput
                            value={endDate}
                            todayButton="Hoje"
                            locale="pt"
                            className={"form-control"}
                            dayPickerProps={{
                                locale: "pt",
                                format: "DD/MM/YYYY",
                            }}
                            onDayChange={setEndDate}
                            inputProps={{ className: "form-control" }}
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSearch}
                            disabled={!startDate && !endDate}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
                <hr />
                <table className="table table-striped table-hover table-sm ">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td onClick={() => requestSort("name")}>Nome</td>
                            <td onClick={() => requestSort("hanName")}>Han</td>
                            <td>Qtde. Presenças</td>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(function (presence, idx) {
                            return (
                                <tr>
                                    <td className="ml-3">{idx + 1}</td>
                                    <td>
                                        <FontAwesomeIcon
                                            icon={faCircle}
                                            className={
                                                getPersonCssClassFromPresence(
                                                    presence
                                                ) + " mr-2"
                                            }
                                        />
                                        {presence.name}
                                    </td>
                                    <td>{presence.hanName}</td>
                                    <td>{presence.count || 1}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PresenceByPersonReportPage;
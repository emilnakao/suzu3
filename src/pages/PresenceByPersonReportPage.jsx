import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { getPersonCssClassFromPresence } from "../utils/CssClassProvider";
import useSortableData from "../hooks/useSortableData";
import { presenceRepository } from "../services/ApplicationContext";
import DatePicker from "../components/DatePicker";
import TimeSelect from "../components/TimeSelect";
import DayOfWeekSelect from "../components/DayOfWeekSelect";
import NotificationService from "../services/NotificationService";
import { logError } from "../utils/Logger";

/**
 *
 * @param {*} props
 */
function PresenceByPersonReportPage() {
    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const [startTime, setStartTime] = useState(undefined);

    const [endTime, setEndTime] = useState(undefined);

    const [dayOfWeek, setDayOfWeek] = useState(undefined);

    const [presenceList, setPresenceList] = useState([]);

    const { items, requestSort } = useSortableData(presenceList);

    const handleSearch = async () => {
        presenceRepository
            .findPresencesByInterval({
                startDate: startDate,
                endDate: endDate,
                startTime: startTime ? startTime.value : undefined,
                endTime: endTime ? endTime.value : undefined,
                dayOfWeek: dayOfWeek,
            })
            .then((response) => {
                let groupedResponse = response.docs || [];
                let counts = groupedResponse.reduce(
                    (accumulator, currentValue) => {
                        let name = currentValue.person.name;

                        if (!accumulator.hasOwnProperty(name)) {
                            accumulator[name] = {
                                count: 0,
                                person: currentValue.person,
                            };
                        }

                        accumulator[name].count++;

                        return accumulator;
                    },
                    {}
                );

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
            })
            .catch((reason) => {
                logError("PresenceByPersonReport", reason);
                NotificationService.error("Erro", reason);
            });
    };

    return (
        <div role="main" className="w-100 vh-100 jumbotron">
            <div className="col-md-12">
                <h1>Presenças por Pessoa</h1>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor={"startDatePicker"}>
                            <b>Período de Busca</b>
                        </label>
                        <br />
                        <DatePicker
                            id={"startDatePicker"}
                            value={startDate}
                            onChange={setStartDate}
                        />
                        &nbsp; a &nbsp;
                        <DatePicker value={endDate} onChange={setEndDate} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-5 mb-3 ">
                        <label>Horário de Entrada (Opcional)</label>
                        <br />
                        <div className="d-inline-flex">
                            <TimeSelect
                                value={startTime}
                                onChange={setStartTime}
                            />
                            &nbsp; a &nbsp;
                            <TimeSelect value={endTime} onChange={setEndTime} />
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="form-group">
                            <label>Dia da Semana </label>
                            <DayOfWeekSelect
                                value={dayOfWeek}
                                onChange={setDayOfWeek}
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSearch}
                    disabled={!startDate && !endDate}
                >
                    Buscar
                </button>
                <hr />
                <table className="table table-striped table-hover table-sm ">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td onClick={() => requestSort("name")}>
                                <u
                                    title="Clique para ordenar"
                                    style={{ cursor: "pointer" }}
                                >
                                    Nome
                                </u>
                            </td>
                            <td onClick={() => requestSort("hanName")}>
                                <u
                                    title="Clique para ordenar"
                                    style={{ cursor: "pointer" }}
                                >
                                    Han
                                </u>
                            </td>
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

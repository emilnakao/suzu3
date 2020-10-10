import React, { useState } from "react";
import moment from "moment";
import useSortableData from "../hooks/useSortableData";
import { presenceRepository } from "../services/ApplicationContext";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import DayOfWeekSelect from "../components/DayOfWeekSelect";

/**
 *
 * @param {*} props
 */
function PresenceByDayReportPage() {
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
                startTime: startTime,
                endTime: endTime,
                dayOfWeek: dayOfWeek,
            })
            .then((response) => {
                let groupedResponse = response.docs || [];
                let counts = groupedResponse.reduce(
                    (accumulator, currentValue) => {
                        let dia = moment(currentValue.event.date).format(
                            "DD/MM/YYYY"
                        );

                        if (!accumulator.hasOwnProperty(dia)) {
                            accumulator[dia] = {
                                kumite: 0,
                                firstTime: 0,
                                miKumite: 0,
                                dayAsDate: moment(
                                    currentValue.event.date
                                ).startOf("day"),
                            };
                        }

                        if (currentValue.isFirstTime) {
                            accumulator[dia].firstTime++;
                        } else if (currentValue.person.isMiKumite) {
                            accumulator[dia].miKumite++;
                        } else {
                            accumulator[dia].kumite++;
                        }

                        return accumulator;
                    },
                    {}
                );

                groupedResponse = Object.keys(counts).map((k) => {
                    return { day: k, ...counts[k] };
                });

                setPresenceList(groupedResponse);
            });
    };

    return (
        <div role="main" className="w-100 vh-100 jumbotron">
            <div className="col-md-12">
                <h1>Presenças por Dia</h1>

                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label for={"startDatePicker"}>
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
                    <div class="col-md-2 mb-2">
                        <div className="form-group">
                            <label>Horário Início</label>
                            <TimePicker
                                value={startTime}
                                onChange={setStartTime}
                            />
                        </div>
                    </div>
                    <div class="col-md-2 mb-2">
                        <div className="form-group">
                            <label>Horário Fim</label>
                            <TimePicker value={endTime} onChange={setEndTime} />
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
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
                            <td onClick={() => requestSort("dayAsDate")}>
                                <u
                                    title="Clique para ordenar"
                                    style={{ cursor: "pointer" }}
                                >
                                    Dia
                                </u>
                            </td>
                            <td>Praticante</td>
                            <td>Primeira Vez</td>
                            <td>Convidado</td>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(function (counts, idx) {
                            return (
                                <tr>
                                    <td className="ml-3">{idx + 1}</td>
                                    <td>{counts.day}</td>
                                    <td>{counts.kumite || 0}</td>
                                    <td>{counts.firstTime || 0}</td>
                                    <td>{counts.miKumite || 0}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PresenceByDayReportPage;

import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import useSortableData from "../hooks/useSortableData";
import { presenceRepository } from "../services/ApplicationContext";
import DatePicker from "../components/DatePicker";

/**
 *
 * @param {*} props
 */
function PresenceByDayReportPage() {
    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const [presenceList, setPresenceList] = useState([]);

    const { items, requestSort } = useSortableData(presenceList);

    const handleSearch = async () => {
        presenceRepository
            .findPresencesByInterval({
                startDate: startDate,
                endDate: endDate,
            })
            .then((response) => {
                let groupedResponse = response.docs || [];
                let counts = groupedResponse.reduce(
                    (accumulator, currentValue) => {
                        let dia = moment(currentValue.dateTime).format(
                            "DD/MM/YYYY"
                        );

                        if (!accumulator.hasOwnProperty(dia)) {
                            accumulator[dia] = {
                                kumite: 0,
                                firstTime: 0,
                                miKumite: 0,
                                dayAsDate: moment(
                                    currentValue.dateTime
                                ).startOf("day"),
                            };
                        }

                        if (currentValue.firstTime) {
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
                <div className="row">
                    <div className="col">
                        <DatePicker value={startDate} onChange={setStartDate} />
                        &nbsp; a &nbsp;
                        <DatePicker value={endDate} onChange={setEndDate} />
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
                            <td onClick={() => requestSort("dayAsDate")}>
                                Dia
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

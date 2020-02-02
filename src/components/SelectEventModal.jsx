import React, {Component} from 'react';
import Select from 'react-select';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import eventTypeService from '../services/EventTypeService';

class SelectEventModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedEvent: {
                eventType: undefined
            },
            events: [],
            selectedEventType: undefined,
            eventTypes: []
        };

        eventTypeService.findAll().then((eventTypes) => {
            this.setState({eventTypes:eventTypes});
        })

    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
        console.log(`Option selected:`, selectedOption);
    }

    render() {
        const {selectedEventType, eventTypes} = this.state;

        return (
            <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog"
                 aria-labelledby="createEventModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createEventModalLabel">Criar Evento</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                               <div className="col">
                                    <Select value={selectedEventType}
                                            onChange={this.handleChange}
                                            options={eventTypes}
                                            placeholder={"Tipo de Evento"}
                                            getOptionLabel={(option) => option.name}
                                    />
                               </div>
                               <div className="col">
                                    <DayPickerInput className={"form-control"} dayPickerProps={{
                                        locale: 'pt',
                                        format: 'DD/MM/yyyy'

                                    }} inputProps={{className: 'form-control'}} />
                               </div>
                            </div>


                        </div>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <td>Evento</td>
                                <td>Data</td>
                            </tr>
                            </thead>
                            {this.state.events.map(function(event, idx){
                                return (<tr>
                                    <td>{event.eventType.name}</td>
                                    <td>{event.date}</td>
                                </tr>)
                            })
                            }

                        </table>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectEventModal
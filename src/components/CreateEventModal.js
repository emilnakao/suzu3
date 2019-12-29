
import React, { Component } from 'react';
import Select from 'react-select';

class CreateEventModal extends Component {

    constructor(props){
        super(props)
        this.state = {event: {
            eventType: undefined
        },
            eventTypes:[
                {name: 'Dia Normal'},
                {name: 'Cerimônia Mensal'}
            ]
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    render(){
        const { selectedOption, eventTypes } = this.state;

        return (
            <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="createEventModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createEventModalLabel">Criar Evento</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Select value={selectedOption}
                                    onChange={this.handleChange}
                                    options={eventTypes}
                                    placeholder={"Selecione o tipo de evento"}
                                    getOptionLabel={(option) => option.name}
                            />
                        </div>
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

export default CreateEventModal
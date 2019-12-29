
import React, { Component } from 'react';
import TodayEventWidget from "../components/TodayEventWidget";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import PresenceListWidget from "../components/PresenceListWidget";

import {HotKeys} from 'react-hotkeys';
import PresenceService from "../services/PresenceService";

const keyMap = {
    moveUp: 'up',
    moveDown: 'down'
}

class SelfCheckIn extends Component {

    constructor(props){
        super(props)
        this.state = {
            placeholderNome: "Digite seu nome aqui",
            nameNotFoundMsg: "Não encontrou seu nome? Aperte Enter para cadastrar.",
            outraRegionalMsg: "É de outra regional? Clique aqui",
            nameNotFound: false,
            suggestions: [],
            focusIndex: 0
        }

        this.keyboardHandlers = {
            'moveUp': (event) => {
                let updatedState = {...this.state};
                if(updatedState.focusIndex > 0){
                    updatedState.focusIndex--;
                }
                this.setState(updatedState)
                console.log('up')
            },
            'moveDown' : (event) => {
                let updatedState = {...this.state};
                if(updatedState.focusIndex < (updatedState.suggestions.length - 1)){
                    updatedState.focusIndex++;
                }
                this.setState(updatedState)
                console.log('down')
            }
        };
    }

    handleNameChange = (event) => {
        // TODO: definir política de busca (não fazer por exemplo buscas consecutivas em menos de 1s)
        PresenceService.findYokoshi(event.target.value).then((data) => {
            let updatedState = {...this.state};
            updatedState.suggestions = data.objects;
            this.setState(updatedState);
        })
    };

    togglePresence = (argument) => {
        let yokoshi = argument;
        return ()=>{
            PresenceService.registerPresence(yokoshi);
        }
    };

    render(){
        return (
            <HotKeys keyMap={keyMap} handlers={this.keyboardHandlers} role="main" className="container-fluid d-flex flex-fill bg-dark">
                <div className="flex-fill d-flex flex-row">
                    <div className="col-3 mr-n2 flex-fill d-flex flex-column">
                        <TodayEventWidget/>
                        <PresenceListWidget/>
                    </div>
                    <div className="flex-fill d-flex">
                        <div className="card mt-2 mb-2 mx-2 flex-fill">
                            <h5 className="card-header"><FontAwesomeIcon icon={faCheck}/> Marcar Presenças </h5>
                            <div className="card-body">
                                <input id={'selfCheckinNameSearchInput'} type="text" className="form-control form-control-lg mb-2" placeholder={this.state.placeholderNome} autoFocus={true} onChange={this.handleNameChange}/>

                                {/* Caso nenhuma sugestão tenha sido encontrada, mostra msg */}
                                {this.state.nameNotFound &&
                                (<div>
                                    <div className="text-center v-100"><i>{this.state.nameNotFoundMsg}</i></div>

                                </div>)

                                }

                                {/* Lista de opções de nomes */}
                                {this.state.suggestions.map(function(suggestion, index){
                                    return <div className={"suzu-checkin-row rounded " + (index === this.state.focusIndex ? 'highlight' : '')} >
                                        <h4>{suggestion.complete_name}</h4>
                                        <button className="btn btn-outline-secondary btn-sm" ng-click="editYokoshi(yokoshi)"><span className="fa fa-pencil text-warning"></span> Corrigir Cadastro</button>
                                        <button className="btn btn-outline-secondary btn-sm" ng-click="cancelPresence(yokoshi)" ng-disabled="!isYokoshiPresent(yokoshi)"><span className="fa fa-minus-square text-danger"></span> Cancelar Presença</button>
                                        <button className="suzu-checkin-row-presencebtn btn btn-success float-right my-auto" ng-disabled="isYokoshiPresent(yokoshi)" onClick={this.togglePresence(suggestion)}><span className="fa fa-check"></span> Marcar Presença</button>

                                    </div>;
                                }.bind(this))}

                                {/* Possibilita busca de yokoshi de outras regionais */}
                                <div className="text-center v-100"><i></i> <button className={"btn btn-primary"}>{this.state.outraRegionalMsg}</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </HotKeys>
        );
    }
}

export default SelfCheckIn
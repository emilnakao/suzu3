import React, {Component} from 'react';
import TodayEventWidget from "../components/TodayEventWidget";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faCommentAlt, faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import PresenceListWidget from "../components/PresenceListWidget";

import {HotKeys} from 'react-hotkeys';
import Switch from "react-switch";
import PresenceService from "../services/PresenceService";

const keyMap = {
    moveUp: 'up',
    moveDown: 'down'
}

class Okiyome extends Component {

    constructor(props){
        super(props)
        this.state = {
            noPresencesMsg:'Não há ninguém presente no momento.',
            presences: [],
            focusIndex: 0,
            showMikumite: false,
            showKumite: true
        };

        PresenceService.findContextPresences().then(result => {
            console.log(result);
            this.setState({presences:result.objects});
        });

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
                if(updatedState.focusIndex < (updatedState.presences.length - 1)){
                    updatedState.focusIndex++;
                }
                this.setState(updatedState)
                console.log('down')
            }
        };
    }

    handleKumiteSwitch = (event) => {

    }

    handleMiKumiteSwitch = (event) => {

    }

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
                            <h5 className="card-header"><FontAwesomeIcon icon={faCheck}/> Controle de Okiyome
                                <span className={"float-right form-inline"}>
                                    <label htmlFor="kumiteSwitch">Kumite</label> <Switch onChange={this.handleKumiteSwitch} checked={this.state.showKumite} id="kumiteSwitch" className={"mx-1"}/>
                                    <label htmlFor="mikumiteSwitch"> Mi-Kumite</label> <Switch onChange={this.handleMiKumiteSwitch} checked={this.state.showMikumite} id="mikumiteSwitch"/>
                                </span>
                            </h5>
                            <div className="card-body">
                                <input type="text" className="form-control form-control-lg mb-2" placeholder={this.state.placeholderNome}/>

                                {/* Caso nenhuma sugestão tenha sido encontrada, mostra msg */}
                                {this.state.presences.length === 0 &&
                                (<div>
                                    <div className="text-center v-100"><i>{this.state.noPresencesMsg}</i></div>

                                </div>)

                                }

                                {/* Lista de presentes */}
                                {this.state.presences.map(function(presence, index){
                                    return <div className={"suzu-checkin-row rounded " + (index === this.state.focusIndex ? 'highlight' : '')} >
                                        <h4>{presence.yokoshi.complete_name} <span className={"float-right"}><small>Recebeu: 8</small></span></h4>
                                        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                            <div className="btn-group mr-2" role="group" aria-label="First group">
                                                <Switch onChange={this.handleKumiteSwitch} checked={this.state.showKumite} id="kumiteSwitch" className={"mx-1"}/> Frontal
                                                <Switch onChange={this.handleKumiteSwitch} checked={this.state.showKumite} id="kumiteSwitch" className={"mx-1"}/> Completo
                                                <Switch onChange={this.handleKumiteSwitch} checked={this.state.showKumite} id="kumiteSwitch" className={"mx-1"}/> Outros
                                            </div>
                                            <div className="btn-group mr-2" role="group" aria-label="Second group">
                                                <button type="button" className="btn btn-outline-secondary"><FontAwesomeIcon icon={faCommentAlt}/></button>
                                                <button type="button" className="btn btn-outline-secondary"><FontAwesomeIcon icon={faEllipsisH}/></button>
                                            </div>
                                        </div>

                                    </div>;
                                }.bind(this))}

                            </div>
                        </div>
                    </div>
                </div>
            </HotKeys>
        );
    }
}

export default Okiyome
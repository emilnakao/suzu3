import React, {Component} from 'react';
import PresenceService from "../services/PresenceService";
import SessionService from "../services/ContextService";

class PresenceListWidget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            event: SessionService.getCurrentContext().event,
            presences: [],
            kumiteLabel:'KUMITE',
            mikumiteLabel:'MIKUMITE',
            firstTimeLabel:'1a VEZ',
            mtaiLabel:'MTAI'
        };

        PresenceService.findContextPresences().then(result => {
            console.log(result);
            this.setState({presences:result.objects});
        });

    }

    render() {
        return (
            <div className="card my-2 flex-fill">
                <h5 className="card-header">Presenças: {this.state.presences.length} </h5>
                <div className="py-1">
                    <div className="d-flex flex-row m-1">
                        <div className="m-1 rounded" style={{height:"80px", backgroundColor:"#428bca", flexBasis: "100%"}}>
                            <div className="presence-counter">{this.state.presences.filter(p => {return !p.yokoshi.is_mikumite}).length}</div>
                            <div className="presence-label">{this.state.kumiteLabel}</div>
                        </div>
                        <div className="m-1 rounded" style={{height:"80px", backgroundColor:"#2b542c", flexBasis: "100%"}}>
                            <div className="presence-counter">{this.state.presences.filter(p => {return p.yokoshi.is_mtai}).length}</div>
                            <div className="presence-label">{this.state.mtaiLabel}</div>
                        </div>
                        <div className="m-1 rounded" style={{height:"80px", backgroundColor:"#5cb85c", flexBasis: "100%"}}>
                            <div className="presence-counter">{this.state.presences.filter(p => {return p.yokoshi.is_mikumite}).length}</div>
                            <div className="presence-label">{this.state.mikumiteLabel}</div>
                        </div>
                        <div className="m-1 rounded" style={{height:"80px", backgroundColor:"#d9534f", flexBasis: "100%"}}>
                            <div className="presence-counter">{this.state.presences.filter(p => {return p.is_first_time}).length}</div>
                            <div className="presence-label">{this.state.firstTimeLabel}</div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover table-sm ">
                        <thead>
                        <tr>
                            <td>#</td>
                            <td>Nome</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.presences.map(function (presence, idx) {
                                return <tr>
                                    <td>{idx + 1}</td>
                                    <td>{presence.yokoshi.complete_name}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default PresenceListWidget
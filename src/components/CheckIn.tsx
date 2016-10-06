import * as React from "react";
import "./CheckIn.less";
import {Person} from "../domain/Person";

export interface CheckInProps {
    compiler: string;
    framework: string;
}

export interface CheckInState {
    checkedInList?: Array<Person>;
    searchToken?: string;
    personList?: Array<Person>;
    personFocus?:Person;
    personFocusIdx?:number;
}

export class CheckIn extends React.Component<CheckInProps, CheckInState> {

    constructor(props) {
        super(props);

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.focusPerson = this.focusPerson.bind(this);
        this.personHasFocus = this.personHasFocus.bind(this);

        this.state = {
            // lista de pessoas que já fizeram check-in
            checkedInList: [],
            // string de busca digitada pelo usuário
            searchToken: '',
            // lista de kumite cadastrados (stub)
            personList: [
                new Person("Ana Maria Braga"),
                new Person("Antônio Moraes"),
                new Person("Carlos Adão"),
                new Person("Denis Costa"),
                new Person("Emil Nakao"),
                new Person("Kamila Nakao"),
                new Person("Lia Nakao"),
                new Person("Maria Massae Yoshigae Nakao"),
                new Person("Nilo Nakao"),
                new Person("Zenilda Zaragoza")
            ]
        };
    }

    filterPersonList(searchToken: string): Array<Person> {
        let regex = new RegExp(".*" + searchToken.replace(" ", ".*") + ".*", "i")

        return this.state.personList.filter(person => {
            return person.name.match(regex) != null;
        });
    }

    handleSearchInputChange(e: React.FormEvent) {
        let target = e.target as HTMLInputElement;
        this.setState({searchToken : target.value});
    }

    /**
     * TODO: refactor me!
     * @param e
     */
    focusPerson(e: React.KeyboardEvent) {
        // arrow down
        if(e.keyCode == 40){
            // ninguém com foco ainda:
            if(this.state.personFocus == undefined && this.state.personList.length > 0){

                this.setState({personFocus : this.state.personList[0], personFocusIdx: 0});

            } else if (this.state.personFocusIdx == this.state.personList.length - 1){
              // não faz nada
            } else if (this.state.personFocusIdx < this.state.personList.length){

                let newFocusIdx = this.state.personFocusIdx + 1;
                this.setState({personFocus : this.state.personList[newFocusIdx], personFocusIdx: newFocusIdx});
            }
        }

        // arrow up
        if(e.keyCode == 38){
            if(this.state.personFocusIdx > 0){
                let newFocusIdx = this.state.personFocusIdx - 1;
                this.setState({personFocus: this.state.personList[newFocusIdx], personFocusIdx: newFocusIdx});
            }else if(this.state.personFocusIdx == 0){
                // não faz nada
            }
        }
    }

    personHasFocus(p : Person){
        return this.state.personFocus != undefined && this.state.personFocus === p;
    }

    render() {
        return <div className="check-in" onKeyDown={this.focusPerson}>
            <div className="check-in-container">
                <h2>Marcar Presenças (Check-In)</h2>
                <div className="form-group">
                    <input className="form-control input-lg" onChange={this.handleSearchInputChange}
                           value={this.state.searchToken} type="text" placeholder="Digite o nome da pessoa" autoFocus="true"/>
                </div>
                <div className="check-in-list">
                    {this.filterPersonList(this.state.searchToken).map(person => (
                            <CheckInOption person={person} shouldFocus={this.personHasFocus(person)}/>
                        )
                    )}
                </div>
            </div>
        </div>;
    }
}

export interface CheckInOptionProps {
    person: Person,
    shouldFocus: boolean
}

class CheckInOption extends React.Component<CheckInOptionProps, {showButtons:boolean}> {
    constructor(props){
        super(props);
        this.state = {showButtons : false}
    }

    render() {
        return (
            <div className="check-in-person" key="{this.props.person.id}">
            <p>{this.props.person.name}</p>
                {this.props.shouldFocus ?
                    <div>
                        buttons
                    </div>
                : null
                }
            </div>
        );
    }
}
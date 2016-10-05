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
}

export class CheckIn extends React.Component<CheckInProps, CheckInState> {

    constructor(props) {
        super(props);

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);

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
        let regex = new RegExp(".*" + searchToken.replace(" ", ".*") + ".*")

        return this.state.personList.filter(person => {
            return person.name.match(regex) != null;
        });
    }

    handleSearchInputChange(e: React.FormEvent) {
        let target = e.target as HTMLInputElement;
        this.setState({searchToken : target.value});
    }

    render() {
        return <div className="check-in">
            <div className="check-in-container">
                <h2>Marcar Presenças (Check-In)</h2>
                <div className="form-group">
                    <input className="form-control input-lg" onChange={this.handleSearchInputChange} value={this.state.searchToken} type="text" placeholder="Digite o nome da pessoa"/>
                </div>
                <div className="check-in-list">
                    <ul>
                        {this.filterPersonList(this.state.searchToken).map(person => (
                                <CheckInOption person={person}/>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>;
    }
}

export interface CheckInOptionProps {
    person: Person
}

class CheckInOption extends React.Component<CheckInOptionProps, {}> {
    render() {
        return (
            <li key="{this.props.person.id}">{this.props.person.name}</li>
        );
    }
}
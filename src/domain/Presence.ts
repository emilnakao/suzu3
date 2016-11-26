import Person from "./Person";
import Event from "./Event";
import {IEntity} from "./IEntity";

/**
 *
 */
export default class Presence implements IEntity {

    _id: string;
    key: string = 'presence';
    person: Person;
    event: Event;
    date: Date;

    constructor(person: Person, event: Event){
        this.person = person;
        this.event = event;
        this.date = new Date();
    }

    createId(): string {
        return `${this.event._id}\\${this.person._id}\\${this.date}`;
    }
}
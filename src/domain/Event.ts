import EventType from "./EventType";
import {IEntity} from "./IEntity";
import * as moment from 'moment';

/**
 *
 * @since 1.0
 */
export default class Event implements IEntity{
    _id: string;

    key: string = 'event';

    type: EventType;

    date: Date;

    constructor(type: EventType, date: Date){
        this.type = type;
        this.date = date;
    }

    createId(): string {
        return `${moment(this.date).format("YYYY/MM/DD")}/${this.type._id}`;
    }

}
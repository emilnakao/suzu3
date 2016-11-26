import {IEntity} from "./IEntity";

/**
 * @since 1.0
 */
export default class EventType implements IEntity{
    _id: string;

    key: string = 'event-type';

    name: string;

    constructor(name: string){
        this.name = name;
    }

    createId(): string {
        return this.name;
    }
}
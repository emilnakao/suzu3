/**
 * Created by emilnakao on 10/5/16.
 */

import {IEntity} from "./IEntity";

export default class Person implements IEntity {
    _id: string;

    key: string = 'person';

    // código de importação
    importCode: string;

    name: string;

    dateCreated: Date = new Date();

    // exemplo: 'kumite', 'mikumite', 'mtai', 'osuewanin', etc.
    groups: Array<string>;

    constructor(name: string){
        this.name = name;
    }

    createId(): string {
        // a data no id reduz um pouco a chance de conflito de ids para homônimos.
        return `${this.name}/${this.dateCreated}`;
    }

}
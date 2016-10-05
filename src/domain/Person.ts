/**
 * Created by emilnakao on 10/5/16.
 */

/**
 *
 */
export class Person{

    id: string;

    // código de importação
    importCode: string;

    name: string;

    // exemplo: 'kumite', 'mikumite', 'mtai', 'osuewanin', etc.
    groups: Array<string>;

    constructor(name: string){
        this.name = name;
    }


}
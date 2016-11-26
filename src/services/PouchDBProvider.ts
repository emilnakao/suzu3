import * as PouchDB from 'pouchdb';
import * as idbadapter from 'pouchdb-adapter-idb'
import {IEntity} from "../domain/IEntity";
import Response = PouchDB.Core.Response;
PouchDB.plugin(idbadapter);

/**
 * Encapsulates database connection details. Data Access Object.
 *
 * @since 1.0
 */
export default class PouchDBProvider {

    private static instance : PouchDBProvider = new PouchDBProvider('suzudb');

    db : any;

    /**
     * Encapsulates the db
     */
    constructor(databaseName : string){
        // usando IndexedDB como backend
        this.db = new PouchDB(databaseName, {adapter:'idb'});
    }

    /**
     *
     * @returns {PouchDBProvider}
     */
    public static defaultInstance():PouchDBProvider{
        return PouchDBProvider.instance;
    }

    /**
     * Saves the document, generating before the id.
     *
     * @param document
     * @returns {void|IDBRequest|Promise<Core.Response>}
     */
    public saveNew(document:IEntity):Promise<Response>{

        // a criação de id manualmente é uma boa prática para evitar índices secundários. Vide documentação do createId().
        document._id = document.createId();

        // inserindo no banco
        return this.db.put(document);
    }

    public findOrCreate(query:any, newDocument:any){

    }

    /**
     *
     * @param document
     * @returns {void|IDBRequest|Promise<Core.Revision<Content>[]>|Promise<Core.Document<Content>&Core.GetMeta>|undefined|V|any}
     */
    public findUnique(document:IEntity):Promise<IEntity>{
        let id = document.createId();

        return this.db.get(id);
    }

    public list(params : any){

    }

}
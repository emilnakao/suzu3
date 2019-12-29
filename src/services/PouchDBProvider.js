import PouchDB from 'pouchdb';
import * as idbadapter from 'pouchdb-adapter-idb'
PouchDB.plugin(idbadapter);

/**
 * Encapsulates database connection details. Data Access Object.
 *
 * @since 1.0
 */
export default class PouchDBProvider {

    static instance = new PouchDBProvider('suzudb');

    db;

    /**
     * Encapsulates the db
     */
    constructor(databaseName){
        // usando IndexedDB como backend
        this.db = new PouchDB(databaseName, {adapter:'idb'});
    }

    /**
     *
     * @returns {PouchDBProvider}
     */
    static defaultInstance(){
        return PouchDBProvider.instance;
    }

    /**
     * Saves the document, generating before the id.
     *
     * @param document
     * @returns {void|IDBRequest|Promise<Core.Response>}
     */
    saveNew(document){

        // a criação de id manualmente é uma boa prática para evitar índices secundários. Vide documentação do createId().
        document._id = document.createId();

        // inserindo no banco
        return this.db.put(document);
    }

    findOrCreate(query, newDocument){

    }

    /**
     *
     * @param document
     * @returns {void|IDBRequest|Promise<Core.Revision<Content>[]>|Promise<Core.Document<Content>&Core.GetMeta>|undefined|V|any}
     */
    findUnique(document){
        let id = document.createId();

        return this.db.get(id);
    }

    list(params){

    }

}
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import PouchDBQuickSearch from 'pouchdb-quick-search';

/**
 * Encapsulates database connection details. Data Access Object.
 *
 * @since 1.0
 */
class PouchDBProvider {

    db

    /**
     * Encapsulates the db
     */
    constructor(databaseName) {
        PouchDB.plugin(PouchDBFind);
        PouchDB.plugin(PouchDBQuickSearch);
        this.db = new PouchDB('suzudb');
    }

    async getDb() {
        await this.db.info();
        return Promise.resolve(this.db);
    }

    convertResponseToSimpleArray(pouchDBResponse) {
        if (pouchDBResponse && pouchDBResponse.docs) {
            return pouchDBResponse.docs;
        }

        return [];
    }

    /**
     * Saves the document, generating before the id.
     *
     * @param document
     * @returns {void|IDBRequest|Promise<Core.Response>}
     */
    async saveNew(id, document) {

        // a criação de id manualmente é uma boa prática para evitar índices secundários. Vide documentação do createId().
        document._id = id;

        // inserindo no banco
        return this.getDb().then(db => {
            return db.put(document)
        });
    }

    findOrCreate(query, newDocument) {

    }

    /**
     *
     * @param document
     * @returns {void|IDBRequest|Promise<Core.Revision<Content>[]>|Promise<Core.Document<Content>&Core.GetMeta>|undefined|V|any}
     */
    async findUnique(id) {
        return this.getDb().then(db => {
            return db.get(id)
        });
    }
}

export default new PouchDBProvider('suzudb');
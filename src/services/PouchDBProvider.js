import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import PouchDBQuickSearch from 'pouchdb-quick-search';

/**
 * Encapsulates database connection details. Data Access Object.
 *
 * @since 1.0
 */
class PouchDBProvider {

    /**
     * Encapsulates the db
     */
    create(databaseName) {
        PouchDB.plugin(PouchDBFind)
        PouchDB.plugin(PouchDBQuickSearch)
        return new PouchDB(databaseName)
    }

    convertResponseToSimpleArray(pouchDBResponse) {
        if (!pouchDBResponse) {
            return []
        }

        if (pouchDBResponse.docs) {
            return pouchDBResponse.docs
        } else if (pouchDBResponse.rows) {
            return pouchDBResponse.rows.map(elem => {
                return elem.doc
            })
        }

        return []
    }

    getDefaultDatabaseName() {
        return 'suzudb'
    }

    // /**
    //  * Saves the document, generating before the id.
    //  *
    //  * @param document
    //  * @returns {void|IDBRequest|Promise<Core.Response>}
    //  */
    // async saveNew(id, document) {

    //     // a criação de id manualmente é uma boa prática para evitar índices secundários. Vide documentação do createId().
    //     document._id = `${document.type}::${id}`;

    //     // inserindo no banco
    //     return this.getDb().then(db => {
    //         return db.put(document)
    //     });
    // }

    // /**
    //  *
    //  * @param document
    //  * @returns {void|IDBRequest|Promise<Core.Revision<Content>[]>|Promise<Core.Document<Content>&Core.GetMeta>|undefined|V|any}
    //  */
    // async findUnique(id) {
    //     return this.getDb().then(db => {
    //         return db.get(id)
    //     });
    // }
}

export default new PouchDBProvider()
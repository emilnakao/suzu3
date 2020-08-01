import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import PouchDBQuickSearch from "pouchdb-quick-search";

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
        PouchDB.plugin(PouchDBFind);
        PouchDB.plugin(PouchDBQuickSearch);
        return new PouchDB(databaseName);
    }

    convertResponseToSimpleArray(pouchDBResponse) {
        if (!pouchDBResponse) {
            return [];
        }

        if (pouchDBResponse.docs) {
            return pouchDBResponse.docs;
        } else if (pouchDBResponse.rows) {
            return pouchDBResponse.rows.map((elem) => {
                return elem.doc;
            });
        }

        return [];
    }

    getDefaultDatabaseName() {
        return "suzudb";
    }
}

export default new PouchDBProvider();

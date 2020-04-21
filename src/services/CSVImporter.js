import {
    parse
} from 'csv';
import fs from 'fs';

import IdGenerator from './IdGenerator';
import PouchDBProvider from './PouchDBProvider';
import NotificationService from './NotificationService';

export class CSVImporter {

    db

    constructor(databaseName) {
        this.db = PouchDBProvider.create(databaseName)
    }

    importPerson = async (filePath) => {
        return this.importDocument('person', filePath, (person) => {
            return IdGenerator.generatePersonId(person)
        });
    }

    importEventType = async (filePath) => {
        return this.importDocument('eventType', filePath, (eventType) => {
            return IdGenerator.generateEventTypeId(eventType)
        });
    }

    importHan = async (filePath) => {
        return this.importDocument('han', filePath, (han) => {
            return IdGenerator.generateHanId(han)
        });
    }

    /**
     * Loads a .csv file and saves person registries in the db.
     */
    importDocument = async (type, filePath, generateIdFn) => {
        let data = fs.readFileSync(filePath, 'utf-8');

        return new Promise((resolve, reject) => {
            const parser = parse({
                delimiter: ',',
                columns: true
            }, (err, records) => {
                if (records) {
                    let saveNewPromises = [];

                    records.forEach(element => {
                        saveNewPromises.push(this.db.put({
                            _id: generateIdFn(element),
                            type: type,
                            ...element
                        }));
                    });

                    resolve(Promise.all(saveNewPromises).catch(e => {
                        NotificationService.error(`Erro ao carregar o arquivo: ${e.message}`);
                    }));
                } else if (!err) {
                    resolve([]);
                }

                if (err) {
                    NotificationService.error(err.message);
                    reject(err);
                }
            });

            parser.write(data);
            parser.end();
        });
    }


}

export default new CSVImporter(PouchDBProvider.getDefaultDatabaseName())
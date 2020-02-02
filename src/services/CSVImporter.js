import fs from 'fs';
import {
    parse
} from 'csv'
import PouchDBProvider from './PouchDBProvider';
import {
    toast
} from 'react-toastify';

class CSVImporter {

    importPerson = async (filePath) => {
        return this.importDocument('person', filePath);
    }

    importEventType = async (filePath) => {
        return this.importDocument('eventType', filePath);
    }

    importHan = async (filePath) => {
        return this.importDocument('han', filePath);
    }

    /**
     * Loads a .csv file and saves person registries in the db.
     */
    importDocument = async (type, filePath) => {
        let data = fs.readFileSync(filePath, 'utf-8');

        return new Promise((resolve, reject) => {
            const parser = parse({
                delimiter: ',',
                columns: true
            }, (err, records) => {
                if (records) {
                    let saveNewPromises = [];

                    records.forEach(element => {
                        saveNewPromises.push(PouchDBProvider.saveNew(element.id, {
                            type: type,
                            ...element
                        }));
                    });

                    resolve(Promise.all(saveNewPromises).catch(e => {
                        toast.error(`Erro ao carregar o arquivo: ${e.message}`);
                    }));
                } else if (!err) {
                    resolve([]);
                }

                if (err) {
                    toast.error(err.message);
                    reject(err);
                }
            });

            parser.write(data);
            parser.end();
        });
    }


}

export default new CSVImporter();
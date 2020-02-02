import fs from 'fs';
import {
    parse
} from 'csv'
import PouchDBProvider from './PouchDBProvider';

class CSVImporter {

    importPerson = async (fileName) => {
        let data = fs.readFileSync(fileName, 'utf-8');
        
        return new Promise((resolve, reject) => {
                const parser = parse({
                    delimiter: ',',
                    columns: true
                }, (err, records) => {
                    if (records) {
                        let saveNewPromises = [];

                        records.forEach(element => {
                            saveNewPromises.push(PouchDBProvider.saveNew(element.id, {
                                type: 'yokoshi',
                                ...element
                            }));
                        });

                        resolve(Promise.all(saveNewPromises));
                    } else if (!err) {
                        resolve([]);
                    }

                    if (err) {
                        console.error(err.message);
                        reject(err);
                    }
                });

                parser.write(data);
                parser.end();
            });
    }
}

export default new CSVImporter();
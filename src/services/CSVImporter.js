import { parse } from "csv";
import fs from "fs";

import NotificationService from "./NotificationService";

export class CSVImporter {
    db;
    idGenerator;

    constructor({ db, idGenerator }) {
        this.db = db;
        this.idGenerator = idGenerator;
        this.importDocument = this.importDocument.bind(this);
    }

    importPerson = async (filePath) => {
        return this.importDocument("person", filePath, (person) => {
            return this.idGenerator.generatePersonId(person);
        });
    };

    importEventType = async (filePath) => {
        return this.importDocument("eventType", filePath, (eventType) => {
            return this.idGenerator.generateEventTypeId(eventType);
        });
    };

    importHan = async (filePath) => {
        return this.importDocument("han", filePath, (han) => {
            return this.idGenerator.generateHanId(han);
        });
    };

    /**
     * Loads a .csv file and saves person registries in the db.
     */
    importDocument = async (type, filePath, generateIdFn) => {
        let data = fs.readFileSync(filePath, "utf-8");

        return new Promise((resolve, reject) => {
            const parser = parse(
                {
                    delimiter: ",",
                    columns: true,
                },
                (err, records) => {
                    if (records) {
                        let saveNewPromises = [];

                        records.forEach((element) => {
                            saveNewPromises.push(
                                this.db.put({
                                    _id: generateIdFn(element),
                                    type: type,
                                    ...element,
                                })
                            );
                        });

                        resolve(
                            Promise.all(saveNewPromises).catch((e) => {
                                NotificationService.error(
                                    `Erro ao carregar o arquivo: ${e.message}`
                                );
                            })
                        );
                    } else if (!err) {
                        resolve([]);
                    }

                    if (err) {
                        NotificationService.error(err.message);
                        reject(err);
                    }
                }
            );

            parser.write(data);
            parser.end();
        });
    };
}

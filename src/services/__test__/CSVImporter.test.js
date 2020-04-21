import {
    CSVImporter
} from './../CSVImporter'
import path from 'path';
import PouchDBProvider from '../PouchDBProvider';
import IdGenerator from '../IdGenerator';

describe('CSVImporter', () => {

    let db, csvImporter

    beforeEach(async () => {
        db = PouchDBProvider.create('testCSVImporter')
        csvImporter = new CSVImporter('testCSVImporter')
    })

    it('Imports person data', async () => {
        let fileName = path.join(__dirname, 'yokoshi.csv');

        // csv import takes longer than the default 5s timeout
        jest.setTimeout(30000);

        await csvImporter.importPerson(fileName);

        // check if first data line of yokoshi.csv is imported
        let savedPersonSample = await db.get(IdGenerator.generatePersonId({
            name: 'Emil Yoshigae NAKAO'
        }));
        expect(savedPersonSample.name).toEqual('Emil Yoshigae NAKAO');
    });

    afterEach(async () => {
        await db.destroy()
    })
})
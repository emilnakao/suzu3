import CSVImporter from './../CSVImporter'
import path from 'path';
import PouchDBProvider from '../PouchDBProvider';

it('Imports yokoshi data', async () => {
    // TODO: criar e limpar o banco no beforeEach e afterEach
    
    let fileName = path.join(__dirname, 'yokoshi.csv');

    // csv import takes longer than the default 5s timeout
    jest.setTimeout(30000);
    
    await CSVImporter.importPerson(fileName);

    // check if first data line of yokoshi.csv is imported
    let savedPersonSample = await PouchDBProvider.findUnique('1');
    expect(savedPersonSample.name).toEqual('Emil Yoshigae NAKAO');
});
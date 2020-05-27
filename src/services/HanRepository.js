import PouchDBProvider from './PouchDBProvider';

export class HanRepository {

    db

    constructor() {
        this.db = PouchDBProvider.create(PouchDBProvider.getDefaultDatabaseName())
    }

    static getDocType() {
        return 'han'
    }

    async findAll() {
        return this.db.find({
            selector: {
                type: HanRepository.getDocType()
            },
        });
    }
}

export default new HanRepository();
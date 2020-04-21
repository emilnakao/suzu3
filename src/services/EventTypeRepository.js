import PouchDBProvider from './PouchDBProvider';

export class EventTypeRepository {

    db

    constructor() {
        this.db = PouchDBProvider.create(PouchDBProvider.getDefaultDatabaseName())
    }

    static getDocType() {
        return 'eventType'
    }

    async findAll() {
        return this.db.find({
            selector: {
                type: EventTypeRepository.getDocType()
            },
        });
    }
}

export default new EventTypeRepository();
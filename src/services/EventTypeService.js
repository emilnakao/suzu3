import PouchDBProvider from './PouchDBProvider';

class EventTypeService {

    async findAll() {
        let db = await PouchDBProvider.getDb();

        return db.find({
            selector: {
                type: 'eventType'
            },
        });
    }
}

export default new EventTypeService();
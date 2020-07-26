export default class EventTypeRepository {
    db;
    idGenerator;

    constructor({ db, idGenerator }) {
        this.db = db;
        this.idGenerator = idGenerator;
    }

    static getDocType() {
        return "eventType";
    }

    async findAll() {
        return this.db.find({
            selector: {
                type: EventTypeRepository.getDocType(),
            },
        });
    }
}

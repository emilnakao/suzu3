export default class EventTypeRepository {
    db;
    idGenerator;

    constructor({ db, idGenerator }) {
        this.db = db;
        this.idGenerator = idGenerator;
    }

    getDocType() {
        return "eventType";
    }

    async findAll() {
        return this.db.find({
            selector: {
                type: this.getDocType(),
            },
        });
    }
}

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

    async save({ name }) {
        let newEventType = {
            name: name,
            type: this.getDocType(),
        };

        newEventType._id = this.idGenerator.generateEventTypeId(newEventType);

        await this.db.put(newEventType);

        return newEventType;
    }
}

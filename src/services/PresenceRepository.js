import moment from "moment";

export default class PresenceRepository {
    db;

    constructor({ db, idGenerator }) {
        this.db = db;
        this.idGenerator = idGenerator;
    }

    getDocType() {
        return "presence";
    }

    async findEventPresences(event) {
        // TODO: adaptar formato do json de resposta
        return this.db.find({
            selector: {
                type: this.getDocType(),
                "event._id": event._id,
            },
        });
    }

    async findPresencesByInterval({ startDate, endDate }) {
        let startOfStartDate = moment(startDate).startOf("day").toDate();
        let endOfEndDate = moment(endDate).endOf("day").toDate();

        return this.db.find({
            selector: {
                type: this.getDocType(),
                dateTime: {
                    $gte: startOfStartDate,
                    $lte: endOfEndDate,
                },
            },
        });
    }

    async savePresence({ person, event, isFirstTime }) {
        // creating a new presence
        let newPresence = {
            person: person,
            type: "presence",
            event: event,
            isFirstTime: isFirstTime,
            dateTime: event.date,
            begin_date_time: new Date(),
        };

        newPresence._id = this.idGenerator.generatePresenceId(newPresence);

        // saving
        await this.db.put(newPresence);

        return newPresence;
    }

    removePresence(presence) {
        this.db.remove(presence);
    }
}

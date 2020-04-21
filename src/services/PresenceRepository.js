import PouchDBProvider from "./PouchDBProvider";
import IdGenerator from "./IdGenerator";

/**
 */
export class PresenceRepository {

    db

    constructor() {
        this.db = PouchDBProvider.create(PouchDBProvider.getDefaultDatabaseName())
    }

    static getDocType() {
        return 'presence'
    }

    async findEventPresences(event) {
        // TODO: adaptar formato do json de resposta
        return this.db.find({
            selector: {
                type: PresenceRepository.getDocType(),
                "event._id": event._id
            }
        });
    }

    async savePresence({
        person,
        event,
        isFirstTime
    }) {
        // creating a new presence
        let newPresence = {
            person: person,
            type: 'presence',
            event: event,
            isFirstTime: isFirstTime,
            dateTime: new Date(),
            begin_date_time: new Date()
        };

        newPresence._id = IdGenerator.generatePresenceId(newPresence);

        // saving
        await this.db.put(newPresence)

        return newPresence;
    }

    removePresence(presence) {

        this.db.remove(presence);
    }


}

export default new PresenceRepository();
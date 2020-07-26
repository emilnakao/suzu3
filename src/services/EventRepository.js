import { formatDate } from "../utils/StringUtils";
import { logNewData } from "../utils/Logger";

export class EventRepository {
    db;
    idGenerator;

    constructor({ db, idGenerator }) {
        this.db = db;
        this.idGenerator = idGenerator;
    }

    getDocType() {
        return "event";
    }

    async findEvents(date, eventTypeId) {
        let selector = {
            type: this.getDocType(),
        };

        if (date) {
            let formattedDate = formatDate(date);
            selector.date = {
                $eq: formattedDate,
            };
        }

        if (eventTypeId) {
            selector["eventType.id"] = {
                $eq: eventTypeId,
            };
        }

        return this.db.find({
            selector: selector,
        });
    }

    /**
     *
     * @param {date} date
     * @param {object} eventType
     */
    async findOrCreateEvent(date, eventType) {
        let existingEvent = await this.findEvents(date, eventType.id);

        if (
            existingEvent &&
            existingEvent.docs &&
            existingEvent.docs.length > 0
        ) {
            return Promise.resolve(existingEvent.docs[0]);
        }

        // if an event of same type still does not exist, create:
        let newEvent = {
            type: this.getDocType(),
            eventType: eventType,
            date: formatDate(date),
        };

        newEvent._id = this.idGenerator.generateEventId(newEvent);

        this.db.put(newEvent);

        logNewData(newEvent);

        return Promise.resolve({
            ...newEvent,
            id: newEvent._id,
        });
    }
}

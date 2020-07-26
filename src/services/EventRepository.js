import { formatDate } from "../utils/StringUtils";

export class EventRepository {
    db;
    idGenerator;

    constructor({ db, idGenerator }) {
        this.db = db;
        this.idGenerator = idGenerator;
    }

    static getDocType() {
        return "event";
    }

    /**
     * Eventos por dia e tipo
     * @param day
     * @param type
     * @returns {Promise.<void>}
     */
    async findEvents(date, eventTypeId) {
        let selector = {
            type: EventRepository.getDocType(),
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

    async findOrCreateEventToday(eventType) {
        console.log(`Chamou EventService.findOrCreateEventToday`);
        let existingEvent = await this.findEvents(new Date(), eventType.id);

        if (
            existingEvent &&
            existingEvent.docs &&
            existingEvent.docs.length > 0
        ) {
            console.log(
                `findOrCreateEventToday retornando evento existente. ${JSON.stringify(
                    existingEvent
                )}`
            );
            return Promise.resolve(existingEvent.docs[0]);
        }

        // if an event of same type still does not exist, create:
        let newEvent = {
            type: EventRepository.getDocType(),
            eventType: eventType,
            date: formatDate(new Date()),
        };

        newEvent._id = this.idGenerator.generateEventId(newEvent);

        this.db.put(newEvent);
        console.log(
            `findOrCreateEventToday retornando evento recém criado: ${JSON.stringify(
                newEvent
            )}`
        );
        return Promise.resolve({
            ...newEvent,
            id: newEvent._id,
        });
    }
}

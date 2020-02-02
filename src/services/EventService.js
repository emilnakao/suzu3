import moment from 'moment';
import PouchDBProvider from "./PouchDBProvider";

class EventService {
    /**
     * Eventos por dia e tipo
     * @param day
     * @param type
     * @returns {Promise.<void>}
     */
    async findEvents(date, eventTypeId) {
        let db = await PouchDBProvider.getDb();
        let formattedDate = this.formatDate(date);

        console.log(`Buscando eventos do tipo ${eventTypeId} e data ${formattedDate}`);

        return db.find({
            selector: {
                type: 'event',
                date: {
                    '$eq': formattedDate
                },
                // "event.id": {
                //     '$eq': eventTypeId
                // }
            },
        });
    }

    async findOrCreateEventToday(eventType) {
        console.log(`Chamou EventService.findOrCreateEventToday`);
        let existingEvent = await this.findEvents(new Date(), eventType.id);

        if (existingEvent && existingEvent.docs && existingEvent.docs.length > 0) {
            console.log(`findOrCreateEventToday retornando evento existente. ${JSON.stringify(existingEvent)}`);
            return Promise.resolve(existingEvent.docs[0]);
        }

        // if an event of same type still does not exist, create:
        let newEvent = {
            type: 'event',
            event_type: eventType,
            date: this.formatDate(new Date())
        };

        let savedDoc = await PouchDBProvider.saveNew(`${eventType.id}-${newEvent.date}`, newEvent);
        console.log(`findOrCreateEventToday retornando evento recém criado: ${JSON.stringify(savedDoc)}`);
        return Promise.resolve({
            ...newEvent,
            id: savedDoc.id
        });
    }

    formatDate(date) {
        return moment(date).format('YYYY-MM-DD');
    }
}

export default new EventService();
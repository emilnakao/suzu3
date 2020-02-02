import NotificationService from "./NotificationService"
import Requester from "../Requester"
import ContextService from "./ContextService";
import PouchDBProvider from "./PouchDBProvider";

/**
 */
class PresenceService {

    constructor() {
        PouchDBProvider.getDb().then(db => {
            db.createIndex({
                index: {
                    fields: ['type', 'name'],
                    ddoc: 'type-name-index'
                }
            })
        });
    }

    findYokoshiByInitials = async (initials, eventId) => {
        let upperSearchToken = '.*[ ]';
        // TODO: melhorar essa regex
        let uppercaseSearchTerm = initials.replace(/(?=[A-Z])([A-Z]?)/g, upperSearchToken + "$1");
        let searchTerm = uppercaseSearchTerm.substring(upperSearchToken.length) + '.*';

        let db = await PouchDBProvider.getDb();

        return db.find({
            selector: {
                type: 'yokoshi',
                name: {
                    $regex: new RegExp(searchTerm, 'iu')
                }
            },
            limit: 50,
            use_index: 'type-name-index'
        });
    }

    /**
     * Procura por yokoshis cujo nome satisfaça searchToken, incluindo no resultado se o yokoshi está presente ou não no evento corrente.
     * @param searchTerm
     */
    findPerson = async (searchToken) => {
        // busca vazia: retorna lista vazia ou abaixo de 3 caracteres
        if (!searchToken || searchToken.length < 3) {
            return [Promise.resolve(Requester.emptyGetResponse())]
        }

        // TODO: buscar de acordo com a contextualização, levando em conta a regional
        // let currentRegional = ContextService.getCurrentContext().regional;
        let currentEvent = ContextService.getCurrentContext().event;

        if (!currentEvent) {
            NotificationService.error('Oops!!', 'Selecione um evento antes de começar a fazer checkin =)!');
            return Promise.resolve(Requester.emptyGetResponse());
        }

        let upperCaseRegex = new RegExp('^[A-Z]+$');

        if (upperCaseRegex.test(searchToken)) {
            return this.findYokoshiByInitials(searchToken, currentEvent.id)
        } else {
            return this.findYokoshiByName(searchToken, currentEvent.id)
        }
    }

    findYokoshiByName = async (searchToken, eventId) => {
        let db = await PouchDBProvider.getDb();

        // Regex performa mal: 
        return db.search({
            query: searchToken,
            fields: ['name'],
            include_docs: true,
            filter: function (doc) {
                return doc.type === 'yokoshi';
            }
        }).then(result => {
            let docs = [];
            result.rows.forEach(row => {
                docs.push(row.doc);
            });
            return Promise.resolve({
                docs: docs
            });
        });
    }

    async findContextPresences({
        eventId
    }) {
        // TODO: adaptar formato do json de resposta
        return PouchDBProvider.getDb().then(db => db.find({
            selector: {
                type: 'presence',
                "event.id": eventId
            }
        }));
    }

    savePresence(person, event) {
        // creating a new presence
        let newPresence = {
            person: person,
            type: 'presence',
            event: event,
            begin_date_time: new Date()
        };

        newPresence._id = this.calculatePresenceId(newPresence);

        // saving
        PouchDBProvider.getDb().then(db => {
            db.post(newPresence)
        });

        return newPresence;
    }

    removePresence(presence) {

        PouchDBProvider.getDb().then(db => {
            db.remove(presence);
        });
    }

    calculatePresenceId(presence) {
        return `${presence.person._id}_${presence.event._id}`
    }
}

export default new PresenceService();
import Requester from "../Requester";
import IdGenerator from "./IdGenerator";
import PouchDBProvider from "./PouchDBProvider";
import {
    normalizeName
} from "./StringUtils";

export class PersonRepository {

    db

    constructor() {
        this.db = PouchDBProvider.create(PouchDBProvider.getDefaultDatabaseName())
    }

    static getDocType() {
        return 'person'
    }

    findYokoshiByInitials = async (initials) => {
        let upperSearchToken = '.*[ ]';
        // TODO: melhorar essa regex
        let uppercaseSearchTerm = initials.replace(/(?=[A-Z])([A-Z]?)/g, upperSearchToken + "$1");
        let searchTerm = uppercaseSearchTerm.substring(upperSearchToken.length) + '.*';


        return this.db.find({
            selector: {
                type: PersonRepository.getDocType(),
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
    findPerson = async (searchToken, currentEvent) => {
        // busca vazia: retorna lista vazia ou abaixo de 3 caracteres
        if (!searchToken || searchToken.length < 3) {
            return [Promise.resolve(Requester.emptyGetResponse())]
        }

        let upperCaseRegex = new RegExp('^[A-Z]+$');

        if (upperCaseRegex.test(searchToken)) {
            return this.findYokoshiByInitials(searchToken)
        } else {
            return this.findYokoshiByName(searchToken)
        }
    }

    findYokoshiByName = async (searchToken) => {

        let normalizedSearchToken = normalizeName(searchToken)
        return this.db.allDocs({
            include_docs: true,
            startkey: normalizedSearchToken,
            endkey: `${normalizedSearchToken}\uffff`
        }).then(result => {
            let docs = [];
            result.rows.forEach(row => {
                if (row.doc.type === 'person') {
                    docs.push(row.doc);
                }
            });
            return Promise.resolve({
                docs: docs
            });
        });
    }

    /**
     * Saves a new person in the database.
     * <p>
     * 
     * @param {name, isKumite, isMtai} param0 
     */
    async save({
        name,
        isKumite,
        isMtai
    }) {
        let newPerson = {
            name: name,
            type: 'person',
            is_mtai: isMtai,
            is_mikumite: !isKumite,
            creation_date_time: new Date()
        };

        newPerson._id = IdGenerator.calculateId(newPerson);

        // saving
        await this.db.put(newPerson)

        return newPerson;
    }

}

export default new PersonRepository()
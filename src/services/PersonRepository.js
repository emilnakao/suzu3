import { normalizeName } from "../utils/StringUtils";
import { createEmptyPage } from "../utils/Paginator";
import { personRepository } from "./ApplicationContext";

export default class PersonRepository {
    db;
    idGenerator;

    constructor({ db, idGenerator }) {
        this.db = db;
        this.idGenerator = idGenerator;
    }

    static getDocType() {
        return "person";
    }

    findYokoshiByInitials = async (initials) => {
        let upperSearchToken = ".*[ ]";
        // TODO: melhorar essa regex
        let uppercaseSearchTerm = initials.replace(
            /(?=[A-Z])([A-Z]?)/g,
            upperSearchToken + "$1"
        );
        let searchTerm =
            uppercaseSearchTerm.substring(upperSearchToken.length) + ".*";

        return this.db.find({
            selector: {
                type: personRepository.getDocType(),
                name: {
                    $regex: new RegExp(searchTerm, "iu"),
                },
            },
            limit: 50,
            use_index: "type-name-index",
        });
    };

    /**
     * Procura por yokoshis cujo nome satisfaça searchToken, incluindo no resultado se o yokoshi está presente ou não no evento corrente.
     * @param searchTerm
     */
    findPerson = async (searchToken) => {
        // busca vazia: retorna lista vazia ou abaixo de 3 caracteres
        if (!searchToken || searchToken.length < 3) {
            return [Promise.resolve(createEmptyPage())];
        }

        let upperCaseRegex = new RegExp("^[A-Z]+$");

        if (upperCaseRegex.test(searchToken)) {
            return this.findYokoshiByInitials(searchToken);
        } else {
            return this.findYokoshiByName(searchToken);
        }
    };

    findYokoshiByName = async (searchToken) => {
        let normalizedSearchToken = normalizeName(searchToken).toLowerCase();
        return this.db
            .allDocs({
                include_docs: true,
                startkey: normalizedSearchToken,
                endkey: `${normalizedSearchToken}\uffff`,
            })
            .then((result) => {
                let docs = [];
                result.rows.forEach((row) => {
                    if (row.doc.type === "person") {
                        docs.push(row.doc);
                    }
                });
                return Promise.resolve({
                    docs: docs,
                });
            });
    };

    countPerson = async () => {
        let result = await this.db.find({
            selector: {
                type: personRepository.getDocType(),
            },
        });

        return result.docs.length;
    };

    async update(person) {
        person.updateDateTime = new Date();
        this.db.put(person);
    }

    async save({ name, isKumite, isMtai }) {
        let newPerson = {
            name: name,
            type: "person",
            isMtai: isMtai,
            isMiKumite: !isKumite,
            creationDateTime: new Date(),
            updateDateTime: new Date(),
        };

        newPerson._id = this.idGenerator.generatePersonId(newPerson);

        // saving
        await this.db.put(newPerson);

        return newPerson;
    }
}

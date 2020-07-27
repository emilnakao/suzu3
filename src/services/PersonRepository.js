import { normalizeName } from "../utils/StringUtils";
import { createEmptyPage } from "../utils/Paginator";

export default class PersonRepository {
    db;
    idGenerator;

    constructor({ db, idGenerator }) {
        this.db = db;
        this.idGenerator = idGenerator;
    }

    getDocType() {
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

        await this.db.createIndex({
            index: {
                fields: ["type", "name"],
                ddoc: "type-name-index",
            },
        });

        return this.db.find({
            selector: {
                type: this.getDocType(),
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
        // busca vazia: retorna lista vazia ou abaixo de 2 caracteres
        if (!searchToken || searchToken.length < 2) {
            return Promise.resolve(createEmptyPage());
        }

        let upperCaseRegex = new RegExp("^[A-Z]+$");

        if (upperCaseRegex.test(searchToken)) {
            // disabled until we solve performance issues
            // return this.findYokoshiByInitials(searchToken);
            return this.findYokoshiByName(searchToken);
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
                type: this.getDocType(),
            },
        });

        return result.docs.length;
    };

    async update(person) {
        person.updateDateTime = new Date();
        this.db.put(person);
    }

    async save({ name, isKumite, isMtai }) {
        let trimmedName = (name || "").trim();

        if (!trimmedName) {
            throw Error("Por gentileza, informe um nome");
        }

        let newPerson = {
            name: trimmedName,
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

export default class HanRepository {
    db;
    idGenerator;

    constructor({ db, idGenerator }) {
        this.db = db;
        this.idGenerator = idGenerator;
    }

    static getDocType() {
        return "han";
    }

    async findAll() {
        return this.db.find({
            selector: {
                type: HanRepository.getDocType(),
            },
        });
    }
}

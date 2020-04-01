import PouchDBProvider from "./PouchDBProvider";

class PersonService {

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

        newPerson._id = this.calculateId(newPerson);

        // saving
        await PouchDBProvider.getDb().then(db => {
            db.post(newPerson)
        });

        return newPerson;
    }

    /**
     * Id is based on the person's name, removing accents and spaces.
     * 
     * In order to make possible future synchronization with external databases, 
     * and to make conflict resolution simples, it would be better not be based on generated numbers or hashes.
     * 
     * @param {name} person 
     */
    calculateId(person) {
        let name = person.name
        let id = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "_")
        return id
    }
}

export default new PersonService()
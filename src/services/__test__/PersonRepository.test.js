import PouchDBProvider from "../PouchDBProvider";
import IdGenerator from "../../utils/IdGenerator";
import PersonRepository from "../PersonRepository";

describe("PersonRepository", () => {
    let db, repository;

    beforeEach(async () => {
        db = PouchDBProvider.create("testPersonRepository");
        repository = new PersonRepository({
            db: db,
            idGenerator: IdGenerator,
        });
    });

    const saveSamplePerson = function (name) {
        let newPerson = {
            name: name,
            isMtai: true,
            isKumite: true,
        };

        return repository.save(newPerson);
    };

    it("personCount: filter by type", async () => {
        // db contains data of many other types
        db.put({
            _id: "person_meg",
            name: "Meg",
            type: "person",
            isMtai: false,
            isMiKumite: true,
            creationDateTime: new Date(),
            updateDateTime: new Date(),
        });

        db.put({
            _id: "person_bart",
            name: "Bart",
            type: "person",
            isMtai: true,
            isMiKumite: false,
            creationDateTime: new Date(),
            updateDateTime: new Date(),
        });

        db.put({
            _id: "event_type_normal_day",
            name: "Dia Normal",
            type: "eventType",
        });

        // calling the count
        let count = await repository.countPerson();

        // expected result: just documents of person type.
        expect(count).toEqual(2);
    });

    it("personCount: no results", async () => {
        let count = await repository.countPerson();
        expect(count).toEqual(0);
    });

    it("save: happy path", async () => {
        let newPerson = {
            name: "Johann",
            isMtai: false,
            isKumite: false,
        };

        await repository.save(newPerson);
        const newId = IdGenerator.generatePersonId(newPerson);

        let savedData = await db.get(newId);

        expect(savedData._id).toEqual(newId);
        expect(savedData.name).toEqual("Johann");
        expect(savedData.isMtai).toEqual(false);
        expect(savedData.isMiKumite).toEqual(true);
        expect(savedData.creationDateTime).not.toEqual(undefined);
    });

    it("save: auto-trim name", async () => {
        let newPerson = {
            name: "  Josiel",
            isMtai: false,
            isKumite: false,
        };

        let savedData = await repository.save(newPerson);

        expect(savedData.name).toEqual("Josiel");
    });

    it("update: happy path", async () => {
        let newPerson = {
            name: "Johann",
            isMtai: false,
            isKumite: false,
        };

        await repository.save(newPerson);
        const newId = IdGenerator.generatePersonId(newPerson);

        let savedData = await db.get(newId);

        savedData.han = { _id: "han_jardins", name: "Jardins" };
        await repository.update(savedData);

        let updatedData = await db.get(newId);

        expect(updatedData.han.name).toEqual("Jardins");
    });

    it("findPerson: search by name happy path", async () => {
        await saveSamplePerson("João da Silva");
        await saveSamplePerson("Maria da Silva");
        await saveSamplePerson("Joaquim Fragoso");
        await saveSamplePerson("Johann Sebastian Bach");
        await saveSamplePerson("Johanesburgo Cleverton");
        await saveSamplePerson("joao floriano");
        await saveSamplePerson("jörg straße becker");

        // starts searching from 3 char
        let responseEmpty0 = await repository.findPerson("");
        let responseEmpty1 = await repository.findPerson("j");
        let responseNonEmpty2 = await repository.findPerson("jo");

        expect(responseEmpty0.docs.length).toEqual(0);
        expect(responseEmpty1.docs.length).toEqual(0);
        expect(responseNonEmpty2.docs.length).toEqual(6);

        // non case sensitive search
        let responseJoa = await repository.findPerson("joa");
        expect(responseJoa.docs[0].name).toEqual("João da Silva");
        expect(responseJoa.docs[1].name).toEqual("joao floriano");
        expect(responseJoa.docs[2].name).toEqual("Joaquim Fragoso");
        expect(responseJoa.docs.length).toEqual(3);

        // finds special characters
        let responseJorg = await repository.findPerson("jorg");
        expect(responseJorg.docs[0].name).toEqual("jörg straße becker");
        expect(responseJorg.docs.length).toEqual(1);

        let responseJoao = await repository.findPerson("joão");
        expect(responseJoao.docs[0].name).toEqual("João da Silva");
        expect(responseJoao.docs[1].name).toEqual("joao floriano");
        expect(responseJoao.docs.length).toEqual(2);
    });

    it("findPerson: search by initials happy path", async () => {
        await saveSamplePerson("João da Silva");
        await saveSamplePerson("Maria da Silva");
        await saveSamplePerson("Joaquim Fragoso");
        await saveSamplePerson("Johann Sebastian Bach");
        await saveSamplePerson("Johanesburgo Cleverton");
        await saveSamplePerson("joao floriano");
        await saveSamplePerson("jörg straße becker");

        // starts searching from 3 char
        let responseEmpty0 = await repository.findPerson("");
        let responseEmpty1 = await repository.findPerson("j");

        expect(responseEmpty0.docs.length).toEqual(0);
        expect(responseEmpty1.docs.length).toEqual(0);

        // initials
        let responseMS = await repository.findPerson("MS");
        expect(responseMS.docs.length).toEqual(1);

        let responseJF = await repository.findPerson("JF");
        expect(responseJF.docs.length).toEqual(2);

        let responseJSBK = await repository.findPerson("JSBK");
        expect(responseJSBK.docs.length).toEqual(0);
    });

    afterEach(async () => {
        await db.destroy();
    });
});

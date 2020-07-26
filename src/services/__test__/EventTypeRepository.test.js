import EventTypeRepository from "../EventTypeRepository";
import PouchDBProvider from "../PouchDBProvider";
import IdGenerator from "../../utils/IdGenerator";

describe("EventTypeRepository", () => {
    let db, repository;

    beforeEach(async () => {
        db = PouchDBProvider.create("testEventTypeRepository");
        repository = new EventTypeRepository({
            db: db,
            idGenerator: IdGenerator,
        });
    });

    it("Finds all event types", async () => {
        // given: 2 saved event types
        let eventType1 = {
            name: "Normal Day",
            type: repository.getDocType(),
        };

        let eventType2 = {
            name: "Ceremony",
            type: repository.getDocType(),
        };

        await db.put({
            _id: IdGenerator.generateEventTypeId(eventType1),
            ...eventType1,
        });

        await db.put({
            _id: IdGenerator.generateEventTypeId(eventType2),
            ...eventType2,
        });

        // and: 1 generic object of another type
        let genericDoc = {
            name: "Lorem Ipsum",
            type: "any",
        };

        await db.put({
            _id: "xyz",
            ...genericDoc,
        });

        // when: searches for event types
        let result = await repository.findAll();

        // then: returns only docs of event types, ignoring another types
        expect(result.docs.length).toEqual(2);
    });

    afterEach(async () => {
        await db.destroy();
    });
});

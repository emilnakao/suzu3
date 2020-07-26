import EventRepository from "../EventRepository";
import PouchDBProvider from "../PouchDBProvider";
import IdGenerator from "../../utils/IdGenerator";

describe("EventRepository", () => {
    let db, repository;

    beforeEach(async () => {
        db = PouchDBProvider.create("testEventRepository");
        repository = new EventRepository({
            db: db,
            idGenerator: IdGenerator,
        });
    });

    it("Saves an new event", () => {});

    afterEach(async () => {
        await db.destroy();
    });
});

import PouchDBProvider from "../PouchDBProvider";
import { PresenceRepository } from "../PresenceRepository";

describe("PresenceRepository", () => {
    let db, repository;

    beforeEach(async () => {
        db = PouchDBProvider.create("presenceRepositoryTest");
        repository = new PresenceRepository({ db, undefined });

        //
    });

    it.skip("Finds all event types", async () => {});

    afterEach(async () => {
        await db.destroy();
    });
});

import PouchDBProvider from "../PouchDBProvider";

/**
 * https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
 */
describe("PouchDBProvider", () => {
    let db;

    beforeEach(async () => {
        db = PouchDBProvider.create("testPouchDBProvider");
    });

    it("Provides a new db", () => {
        expect(db.name).toEqual("testPouchDBProvider");
    });

    it("Converts a response from allDocs", async () => {
        // saving document for test scenario
        let doc = {
            _id: "1",
            name: "Florence",
        };

        let putResponse = await db.put(doc);

        expect(putResponse.ok).toEqual(true);

        let response = await db.allDocs({
            include_docs: true,
        });
        let responseArray = PouchDBProvider.convertResponseToSimpleArray(
            response
        );

        expect(responseArray.length).toEqual(1);
        expect(responseArray[0]._id).toEqual(doc._id);
    });

    it("Accepts empty response from allDocs", async () => {
        let response = await db.allDocs({
            include_docs: true,
        });

        let responseArray = PouchDBProvider.convertResponseToSimpleArray(
            response
        );

        expect(responseArray.length).toEqual(0);
    });

    afterEach(async () => {
        await db.destroy();
    });
});

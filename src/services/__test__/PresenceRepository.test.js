import moment from "moment";
import IdGenerator from "../../utils/IdGenerator";
import EventRepository from "../EventRepository";
import EventTypeRepository from "../EventTypeRepository";
import PersonRepository from "../PersonRepository";
import PouchDBProvider from "../PouchDBProvider";
import PresenceRepository from "../PresenceRepository";

describe("PresenceRepository", () => {
    let db, repository, personRepository, eventRepository, eventTypeRepository;

    let anaMaria, benicioMurilo;

    let event1, event2, eventType1, eventType2;

    beforeEach(async () => {
        // test subject
        db = PouchDBProvider.create("presenceRepositoryTest");
        repository = new PresenceRepository({
            db: db,
            idGenerator: IdGenerator,
        });

        // setup person test scenario
        personRepository = new PersonRepository({
            db: db,
            idGenerator: IdGenerator,
        });

        anaMaria = await personRepository.save({
            name: "Ana Maria",
            isMtai: true,
            isKumite: true,
        });

        benicioMurilo = await personRepository.save({
            name: "Benicio Murilo",
            isMtai: false,
            isKumite: false,
        });

        // setup event test scenario
        eventTypeRepository = new EventTypeRepository({
            db: db,
            idGenerator: IdGenerator,
        });

        eventType1 = await eventTypeRepository.save({ name: "Event Type 1" });
        eventType2 = await eventTypeRepository.save({ name: "Event Type 2" });

        eventRepository = new EventRepository({
            db: db,
            idGenerator: IdGenerator,
        });

        event1 = await eventRepository.findOrCreateEvent(
            moment("2020-10-01").toDate(),
            eventType1
        );
        event2 = await eventRepository.findOrCreateEvent(
            moment("2020-10-02").toDate(),
            eventType2
        );
    });

    it("Find presences between dates", async () => {
        // given presences between October 1st and 2nd
        let presenceA1 = await repository.savePresence({
            person: anaMaria,
            event: event1,
            isFirstTime: false,
        });

        let presenceA2 = await repository.savePresence({
            person: anaMaria,
            event: event2,
            isFirstTime: false,
        });

        let presenceB2 = await repository.savePresence({
            person: benicioMurilo,
            event: event2,
            isFirstTime: false,
        });

        // search between 29/09 and 30/09:
        let resultOnlyPast = await repository.findPresencesByInterval({
            startDate: "2020-09-29",
            endDate: "2020-09-30",
        });

        expect(resultOnlyPast.docs.length).toEqual(0);

        // 30/09 and 01/10:
        let resultUntilFirst = await repository.findPresencesByInterval({
            startDate: "2020-09-30",
            endDate: "2020-10-01",
        });

        expect(resultUntilFirst.docs.length).toEqual(1);

        // 01/10 and 01/10:
        let resultOnlyFirst = await repository.findPresencesByInterval({
            startDate: "2020-10-01",
            endDate: "2020-10-01",
        });

        expect(resultOnlyFirst.docs.length).toEqual(1);

        // 01/10 and 02/10:
        let resultFirstSecond = await repository.findPresencesByInterval({
            startDate: "2020-10-01",
            endDate: "2020-10-02",
        });

        expect(resultFirstSecond.docs.length).toEqual(3);
    });

    it("Find presences between dates and times", async () => {
        // given presences between October 1st and 2nd
        await repository.savePresence({
            person: anaMaria,
            event: event1,
            isFirstTime: false,
        });

        let past3hours = moment().subtract(3, "hours").format("HH:mm");
        let past1minute = moment().subtract(1, "minutes").format("HH:mm");
        let next3minutes = moment().add(3, "minutes").format("HH:mm");

        // search between 29/09 and 30/09:
        let resultOnlyPast = await repository.findPresencesByInterval({
            startDate: "2020-10-01",
            endDate: "2020-10-01",
            startTime: past3hours,
            endTime: past1minute,
        });

        expect(resultOnlyPast.docs.length).toEqual(0);

        // search between 29/09 and 30/09:
        let resultUntilFuture = await repository.findPresencesByInterval({
            startDate: "2020-10-01",
            endDate: "2020-10-01",
            startTime: past3hours,
            endTime: next3minutes,
        });

        expect(resultUntilFuture.docs.length).toEqual(1);
    });

    it("Open interval for time", async () => {
        await repository.savePresence({
            person: anaMaria,
            event: event1,
            isFirstTime: false,
        });

        let past3hours = moment().subtract(3, "hours").format("HH:mm");

        let result = await repository.findPresencesByInterval({
            startDate: "2020-10-01",
            endDate: "2020-10-01",
            startTime: past3hours,
        });

        expect(result.docs.length).toEqual(1);
    });

    it("Invalid time interval", async () => {
        let past3hours = moment().subtract(3, "hours").format("HH:mm");
        let past1minute = moment().subtract(1, "minutes").format("HH:mm");

        expect(
            repository.findPresencesByInterval({
                startDate: "2020-10-01",
                endDate: "2020-10-01",
                startTime: past1minute,
                endTime: past3hours,
            })
        ).rejects.toMatch("Período de busca inválido.");
    });

    it("Blocks open interval for date", async () => {
        expect(
            repository.findPresencesByInterval({
                endDate: "2020-10-01",
            })
        ).rejects.toMatch(
            "É obrigatório passar uma data inicial e uma data final."
        );

        expect(
            repository.findPresencesByInterval({
                startDate: "2020-10-01",
            })
        ).rejects.toMatch(
            "É obrigatório passar uma data inicial e uma data final."
        );
    });

    it("Searches by day of week", async () => {
        let presenceA1Thu = await repository.savePresence({
            person: anaMaria,
            event: event1,
            isFirstTime: false,
        });

        let presenceA2Fri = await repository.savePresence({
            person: anaMaria,
            event: event2,
            isFirstTime: false,
        });

        let resultSunday = await repository.findPresencesByInterval({
            startDate: "2020-09-29",
            endDate: "2020-10-30",
            dayOfWeek: 1, //Sun
        });

        expect(resultSunday.docs.length).toEqual(0);

        let resultThursday = await repository.findPresencesByInterval({
            startDate: "2020-09-29",
            endDate: "2020-10-30",
            dayOfWeek: 5, //Thu
        });

        expect(resultThursday.docs.length).toEqual(1);
    });
    afterEach(async () => {
        await db.destroy();
    });
});

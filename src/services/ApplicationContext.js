import EventRepository from "./EventRepository";
import EventTypeRepository from "./EventTypeRepository";
import HanRepository from "./HanRepository";
import { CSVImporter } from "./CSVImporter";
import PresenceRepository from "./PresenceRepository";

const { default: PersonRepository } = require("./PersonRepository");
const { default: PouchDBProvider } = require("./PouchDBProvider");
const { default: IdGenerator } = require("../utils/IdGenerator");

// Common initialization arguments for repositories
const repositoryArgs = {
    db: PouchDBProvider.create(PouchDBProvider.getDefaultDatabaseName()),
    idGenerator: IdGenerator,
};

// Repositories
const personRepository = new PersonRepository(repositoryArgs);
const presenceRepository = new PresenceRepository(repositoryArgs);
const eventRepository = new EventRepository(repositoryArgs);
const eventTypeRepository = new EventTypeRepository(repositoryArgs);
const hanRepository = new HanRepository(repositoryArgs);

// CSV
const csvImporter = new CSVImporter({ ...repositoryArgs });

export {
    personRepository,
    presenceRepository,
    eventRepository,
    eventTypeRepository,
    hanRepository,
    csvImporter,
};

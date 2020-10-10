import moment from "moment";

export default class PresenceRepository {
    db;

    constructor({ db, idGenerator }) {
        this.db = db;
        this.idGenerator = idGenerator;
    }

    getDocType() {
        return "presence";
    }

    async findEventPresences(event) {
        // TODO: adaptar formato do json de resposta
        return this.db.find({
            selector: {
                type: this.getDocType(),
                "event._id": event._id,
            },
        });
    }

    async findPresencesByInterval({
        startDate,
        endDate,
        startTime,
        endTime,
        dayOfWeek,
    }) {
        // basic validation
        if (!startDate || !endDate) {
            return Promise.reject(
                "É obrigatório passar uma data inicial e uma data final."
            );
        }

        // datetime interval
        let startOfStartDateMoment = moment(startDate).startOf("day");
        let endOfEndDateMoment = moment(endDate).endOf("day");

        if (startTime) {
            let momentStartTime = moment(startTime, "HH:mm");
            startOfStartDateMoment = moment(startDate)
                .hours(momentStartTime.hours())
                .minutes(momentStartTime.minutes());
        }

        if (endTime) {
            let momentEndTime = moment(endTime, "HH:mm");
            endOfEndDateMoment = moment(endDate)
                .hours(momentEndTime.hours())
                .minutes(momentEndTime.minutes());
        }

        if (startOfStartDateMoment.isAfter(endOfEndDateMoment)) {
            return Promise.reject("Período de busca inválido.");
        }

        let selectorObject = {
            type: this.getDocType(),
            dateTime: {
                $gte: startOfStartDateMoment.toDate(),
                $lte: endOfEndDateMoment.toDate(),
            },
        };

        // day of week optional filter
        if (dayOfWeek && dayOfWeek.value) {
            selectorObject.dayOfWeek = { $eq: `${dayOfWeek.value}` };
        }

        return this.db.find({
            selector: selectorObject,
        });
    }

    async savePresence({ person, event, isFirstTime }) {
        let momentEventDate = moment(event.date);

        // creating a new presence
        let newPresence = {
            person: person,
            type: "presence",
            event: event,
            isFirstTime: isFirstTime,
            dateTime: moment(new Date())
                .year(momentEventDate.year())
                .month(momentEventDate.month())
                .date(momentEventDate.date())
                .toDate(),
            registrationDateTime: new Date(),
            dayOfWeek: moment(event.date).format("E"), // ISO day of week: 1..7 = Sun..Sat
        };

        newPresence._id = this.idGenerator.generatePresenceId(newPresence);

        // saving
        await this.db.put(newPresence);

        return newPresence;
    }

    removePresence(presence) {
        this.db.remove(presence);
    }
}

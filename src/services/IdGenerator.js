import {
    normalizeName
} from './StringUtils'

class IdGenerator {
    /**
     * Id is based on the person's name, removing accents and spaces.
     * 
     * In order to make possible future synchronization with external databases, 
     * and to make conflict resolution simples, it would be better not be based on generated numbers or hashes.
     * 
     * @param {name} person 
     */
    generatePersonId(person) {
        let name = person.name
        let id = normalizeName(name).toLowerCase()

        return id
    }

    generateEventTypeId(eventType) {
        return `eventType_${normalizeName(eventType.name)}`
    }

    generateEventId(event) {
        return `event_${event.eventType._id}-${event.date}`
    }

    generateHanId(han) {
        return `han_${normalizeName(han.name)}`
    }

    generatePresenceId(presence) {
        return `presence_${presence.person._id}_${presence.event._id}`
    }

}

export default new IdGenerator()
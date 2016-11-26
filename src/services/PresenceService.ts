import Person from "../domain/Person";
import Presence from "../domain/Presence";
import EventService from "./EventService";
import PouchDBProvider from "./PouchDBProvider";


/**
 * Created by emilnakao on 10/8/16.
 */
export default class PresenceService{

    /**
     * Given a person, associates it to the current event.
     *
     * @param person
     * @since 1.0
     */
    savePresence(person:Person){
        // searches for the current event
        let currentEvent = EventService.getCurrentEvent();

        // creating a new presence
        let newPresence = new Presence(person, currentEvent);

        // saving
        PouchDBProvider.defaultInstance().saveNew(newPresence);

    }
}
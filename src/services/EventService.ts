import Event from "../domain/Event";
import EventType from "../domain/EventType";

export default class EventService {

    public static getCurrentEvent() : Event{
        let stubType = new EventType('Dia Normal');
        return new Event(stubType, new Date());
    }
}
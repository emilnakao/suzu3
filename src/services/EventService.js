import Requester from "../Requester";
import moment from 'moment';

class EventService {
    /**
     * Eventos por dia e tipo
     * @param day
     * @param type
     * @returns {Promise.<void>}
     */
    async findEvents(date, eventTypeId){
        var searchUrl = '/api/v1/event/?format=json';

        var parsedDate = moment(date);

        if (eventTypeId) {
            searchUrl += '&event_type=' + eventTypeId;
        }

        if (date && parsedDate.isValid()) {
            searchUrl += '&begin_date_time__gte=' + parsedDate.startOf().format();
            // por algum motivo no chrome se não somar 1 dia ele pega o dia anterior
            searchUrl += '&begin_date_time__lt=' + parsedDate.add('d', 1).endOf().format();
        }

        return Requester.get(searchUrl).then(data => {return Requester.convertFromTastypie(data);});
    }

    findOrCreateEventToday(eventType){
        return Requester.post(`/attendancebook/find_or_create_event_for_today/?event_type_id=${eventType}`)
            .then(data => {return Requester.convertFromTastypie(data);});
    }
}

export default new EventService();
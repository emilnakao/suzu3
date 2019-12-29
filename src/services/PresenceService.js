import NotificationService from "./NotificationService"
import Requester from "../Requester"
import ContextService from "./ContextService";
import PouchDBProvider from "./PouchDBProvider";

class PresenceService {

    // TODO: utilizar conceito de store? redux-like? como notificar atualizações?
    currentEventPresences = [
        {id:1, yokoshi: {id:1, complete_name:'Maria do Bairro', is_mtai:true, is_mikumite:false}, is_first_time:false},
        {id:2, yokoshi: {id:2, complete_name:'Marimar', is_mtai:false, is_mikumite:true}, is_first_time:true}
    ];

    /**
     * Procura por yokoshis cujo nome satisfaça searchToken, incluindo no resultado se o yokoshi está presente ou não no evento corrente.
     * @param searchTerm
     */
    findYokoshi(searchToken) {
        // busca vazia: retorna lista vazia
        if(!searchToken){
            return [Promise.resolve(Requester.emptyGetResponse())]
        }

        // TODO: buscar de acordo com a contextualização, levando em conta a regional
        // let currentRegional = ContextService.getCurrentContext().regional;
        let currentEvent = ContextService.getCurrentContext().event;

        if (!currentEvent) {
            NotificationService.error('Oops!!', 'Selecione um evento antes de começar a fazer checkin =)!');
            return Promise.resolve(Requester.emptyGetResponse());
        }

        let upperCaseRegex = new RegExp('^[A-Z]+$');

        if (upperCaseRegex.test(searchToken)) {
            return this.findYokoshiByInitials(searchToken, currentEvent.id)
        } else {
            return this.findYokoshiByName(searchToken, currentEvent.id)
        }
    }

    findYokoshiByInitials(initials, eventId){
        let upperSearchToken = '.*[ ]';
        // TODO: melhorar essa regex
        let uppercaseSearchTerm = initials.replace(/(?=[A-Z])([A-Z]?)/g, upperSearchToken + "$1");
        let searchTerm = uppercaseSearchTerm.substring(upperSearchToken.length) + '.*';

        return Requester.get(`api/v1/presence_count/?format=json&event_id=${eventId}&complete_name__regex=${searchTerm}`)
            .then(data => {return Requester.convertFromTastypie(data);});
    }

    findYokoshiByName(searchToken, eventId){
        let usedSearchTerm = searchToken;
        // TODO: refatorar isso daqui; solucao paleativa!!
        usedSearchTerm = usedSearchTerm.replace(' ', '.*');
        usedSearchTerm = usedSearchTerm.replace('e', '[eéêè]');
        usedSearchTerm = usedSearchTerm.replace('a', '[aãáäâ]');
        usedSearchTerm = usedSearchTerm.replace('i', '[ií]');
        usedSearchTerm = usedSearchTerm.replace('u', '[uúü]');
        usedSearchTerm = usedSearchTerm.replace('o', '[oôö]');
        return Requester.get(`api/v1/presence_count/?format=json&event_id=${eventId}&complete_name__iregex=${usedSearchTerm}`)
            .then(data => {return Requester.convertFromTastypie(data);});
    }

    findContextPresences(){
        let currentEventId = ContextService.getCurrentContext().event.id;
        return Requester.get(`api/v1/presence/?format=json&event__id=${currentEventId}`).then(data => {return Requester.convertFromTastypie(data);});
    }

    registerPresence(yokoshi){
        // creating a new presence
        let newPresence = {
            yokoshi: yokoshi,
            event: ContextService.getCurrentContext().event,
            is_first_time: false,
            begin_date_time: new Date()
        };
        // adicionar
        this.currentEventPresences.push(newPresence);

        // saving
        PouchDBProvider.defaultInstance().saveNew(newPresence);
    }
}

export default new PresenceService();
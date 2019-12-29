import Requester from "../Requester"
import SessionService from "./ContextService";

class YokoshiService {

    find(searchToken){
        // busca vazia: retorna lista vazia
        if(!searchToken){
            return Promise.resolve(Requester.emptyGetResponse())
        }

        // TODO: busca de acordo com a contextualização
        let currentRegional = SessionService.getCurrentContext().regional

        let likeSearch = searchToken.replace(' ', '.*');
        return Requester.get(`v1/yokoshi/?format=json&complete_name__iregex=${likeSearch}`)
            .then((data => {return Requester.convertFromTastypie(data)}));

    }
}

export default new YokoshiService()
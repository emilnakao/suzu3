import axios from 'axios'

class EventTypeService {

    findAll(){
        return axios.get('/api/v1/event_type/?format=json');
    }
}

export default new EventTypeService()
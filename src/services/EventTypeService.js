import axios from 'axios'

class EventTypeService {

    findAll(){
        return Promise.resolve({
                objects:[
                    {id: 1, name: 'Dia Normal'},
                    {id: 2, name: 'Cerimônia Mensal'},
                ],
                pageSize:2,
                currentPage:0,
                count:2
        })
    }
}

export default new EventTypeService()
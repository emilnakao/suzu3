import axios from 'axios';

class Requester {
    BASE_URL = ''

    get(url){
        return axios.get(`${this.BASE_URL}/${url}`);
    }

    post(url, data){
        return axios.post(`${this.BASE_URL}/${url}`, data);
    }

    /**
     * Convert responses from Django Tastypie API
     * @param data
     */
    convertFromTastypie(data){
        if(!data && !data.data){
            return this.emptyGetResponse()
        }else{
            return {
                objects:data.data.objects,
                pageSize:data.data.meta && data.data.meta.limit,
                currentPage:data.data.meta && data.data.meta.offset,
                count:data.data.meta && data.data.meta.total_count
            }
        }
    }

    emptyGetResponse(){
        return {
            objects:[],
            pageSize:0,
            currentPage:0,
            count:0
        }
    }
}

export default new Requester();
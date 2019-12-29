import Requester from "../Requester";
import YokoshiService from "./YokoshiService";

it('returns empty array for null search token', () => {
    return YokoshiService.find(null).then(data=>{
        expect(data.objects).toEqual([]);
    })
});

it('returns empty array for undefined search token', () => {
    return YokoshiService.find(undefined).then(data=>{
        expect(data.objects).toEqual([]);
    })
});

it('returns empty array for empty search token', () => {
    return YokoshiService.find('').then(data=>{
        expect(data.objects).toEqual([]);
    })
});

it('returns non empty object for null response', () => {
    let tastypieResponse = { data: {
        objects:[{id:1, complete_name:'Fulano'}]
    }};
    const spy = jest.spyOn(Requester, 'get').mockImplementation(() => Promise.resolve(tastypieResponse))
    return YokoshiService.find('Fulano').then(data=>{
        expect(data.objects).toEqual([{id:1, complete_name:'Fulano'}])
        expect(spy).toHaveBeenCalled()
    })
})
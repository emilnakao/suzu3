import YokoshiService from "../YokoshiService";

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
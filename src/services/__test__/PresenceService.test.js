import Requester from "../../Requester";
import PresenceService from "../PresenceService";
import SessionService from "../ContextService";
import NotificationService from "../NotificationService";

it('findYokoshi: returns empty array for null search token', () => {
    return PresenceService.findYokoshi(null).then(data=>{
        expect(data.docs).toEqual([]);
    })
});

it('findYokoshi: returns empty array for undefined search token', () => {
    return PresenceService.findYokoshi(undefined).then(data=>{
        expect(data.docs).toEqual([]);
    })
});

it('findYokoshi: returns empty array for empty search token', () => {
    return PresenceService.findYokoshi('').then(data=>{
        expect(data.docs).toEqual([]);
    })
});

it('findYokoshi: returns non empty object for null response', () => {
    return PresenceService.findYokoshi('Fulano').then(data => {
        expect(data.docs).toEqual([{id:1, complete_name:'Fulano'}]);
        expect(spy).toHaveBeenCalled()
    })
});

it('findYokoshi: errors on missing event', () => {
    jest.spyOn(SessionService, 'getCurrentContext').mockImplementation(() => {return {}});
    const spyNotificationService = jest.spyOn(NotificationService, 'error');

    return PresenceService.findYokoshi('Fulano').then((data) => {
        expect(spyNotificationService).toHaveBeenCalled()
        expect(data).toEqual(Requester.emptyGetResponse())
    })
});

it.skip('findYokoshi: searches for initials when all letters are uppercase', () => {
    const spyPresenceService = jest.spyOn(PresenceService, 'findYokoshiByInitials');

    return PresenceService.findYokoshi('EYN').then(() => {
        expect(spyPresenceService).toHaveBeenCalledWith('EYN');
    })
});

it.skip('findYokoshi: executes like search if any letter is lowercase', () => {
    const spyPresenceService = require('../PresenceService');
    spyPresenceService.findYokoshiByName = jest.fn();

    return spyPresenceService.findYokoshi('Lee').then(() => {
        expect(spyPresenceService.findYokoshiByName).toHaveBeenCalledWith('Lee');
    })
});
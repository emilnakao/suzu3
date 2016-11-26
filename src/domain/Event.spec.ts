import Event from './Event';
import EventType from "./EventType";

import {} from 'mocha';
import {expect} from 'chai';
import * as moment from 'moment';

describe('Event', () => {

    it('creates id based on date and event type', () => {
        let eventType = new EventType('Ceremony');
        eventType._id = 'eventTypeId'
        let newEvent = new Event(eventType, moment("20161126","YYYYMMDD").toDate());

        expect(newEvent.createId()).to.be.equal(`2016/11/26/eventTypeId`);
    });

    it('defines property [key] for pouchdb', () => {
        let eventType = new EventType('Ceremony');
        let newEvent = new Event(eventType, new Date());

        expect(newEvent.key).to.be.equal('event');
    })
})
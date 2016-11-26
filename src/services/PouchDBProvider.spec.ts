
import {} from 'mocha';
import {expect} from 'chai';
import * as moment from 'moment';
import PouchDBProvider from "./PouchDBProvider";
import EventType from "../domain/EventType";
import PouchDB from 'pouchdb';

/**
 * https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
 */
describe('PouchDBProvider', () => {

    let provider : PouchDBProvider;

    beforeEach(() => {
        provider = new PouchDBProvider('testdb');
    });

    it('saves a new entity into db', (done) => {
        let newEventType = new EventType("Ceremony");

        provider.saveNew(newEventType).then((result)=>{
           expect(result.id).to.be.equal("Ceremony");
           done();
        }).catch((error) => {
            done(error);
        });

    });

    it('finds an unique entity calculating id :: entity exists', (done) => {
       let newEventType = new EventType("Normal Day");

       provider.saveNew(newEventType).then(()=>{
           return provider.findUnique(newEventType).then((findUniqueResult:EventType)=>{
               expect(findUniqueResult.name).to.be.equal('Normal Day');
               done();
           });
       }).catch((error) => {
           done(error);
       });

    });

    xit('finds an unique entity calculating id :: entity is missing', (done) => {
        let newEventType = new EventType("Normal Day");

        provider.findUnique(newEventType).then((findUniqueResult:EventType)=>{
            expect(findUniqueResult).to.not.exist;
            done();
        }).catch((error)=>{
            done(error);
        });
    })

    afterEach(() => {
        provider.db.allDocs().then(function (result) {
            // Promise isn't supported by all browsers; you may want to use bluebird
            return Promise.all(result.rows.map(function (row) {
                return provider.db.remove(row.id, row.value.rev);
            }));
        }).then(function () {
            // done!
        }).catch(function (err) {
            // error!
        });
    });

})
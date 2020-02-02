import PouchDBProvider from "../PouchDBProvider";

/**
 * https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
 */
describe('PouchDBProvider', () => {

    beforeEach(async ()=> {
       
    });

    it('saves a new entity into db', (done) => {
        let newEventType = {name:"Ceremony"};

        PouchDBProvider.saveNew('ceremony', newEventType).then((result)=>{
           expect(result.ok).toEqual(true);
           done();
        }).catch((error) => { 
            done(error);
        });
    });

    it('finds an unique entity calculating id :: entity exists', (done) => {
       let newEventType = {name:"Normal Day"};

       PouchDBProvider.saveNew('normalDay', newEventType).then(()=>{
           return PouchDBProvider.findUnique('normalDay').then((findUniqueResult)=>{
               expect(findUniqueResult.name).toEqual('Normal Day');
               done();
           });
       }).catch((error) => {
           done(error);
       });

    });

    afterEach(() => {
        
        PouchDBProvider.getDb().then(db => {db.allDocs().then(function (result) {
            // Promise isn't supported by all browsers; you may want to use bluebird
            return Promise.all(result.rows.map(function (row) {
                return db.remove(row.id, row.value.rev);
            }));
        })}).then(function () {
            // done!
        }).catch(function (err) {
            // error!
        });
    });

})
import React from 'react';
import ReactDOM from 'react-dom';
import SelfCheckInPage from "../SelfCheckInPage";

describe('SelfCheckInPage', () => {

    beforeEach(async () => {
        // db = PouchDBProvider.create(PouchDBProvider.getDefaultDatabaseName())
        // await db.info()
    })
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( < SelfCheckInPage / > , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    afterEach(async () => {
        // await db.destroy()
    })
})
import React from 'react';
import ReactDOM from 'react-dom';
import PresenceListWidget from "./PresenceListWidget";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PresenceListWidget />, div);
    ReactDOM.unmountComponentAtNode(div);
});

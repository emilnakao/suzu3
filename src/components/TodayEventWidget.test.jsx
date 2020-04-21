import React from 'react';
import ReactDOM from 'react-dom';
import TodayEventWidget from "./TodayEventWidget";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TodayEventWidget />, div);
    ReactDOM.unmountComponentAtNode(div);
});

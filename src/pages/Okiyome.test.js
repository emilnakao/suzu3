import React from 'react';
import ReactDOM from 'react-dom';
import Okiyome from "./Okiyome";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Okiyome />, div);
    ReactDOM.unmountComponentAtNode(div);
});

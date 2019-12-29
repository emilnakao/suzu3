import React from 'react';
import ReactDOM from 'react-dom';
import SelfCheckIn from "./SelfCheckIn";
import PresenceService from "../services/PresenceService";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SelfCheckIn />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it.skip('shows lines for each suggested yokoshi', () => {
    const page = mount(<SelfCheckIn/>);
    let yokoshiSuggestions = [
        {id: 1, complete_name: 'Maria do Bairro'},
        {id: 2, complete_name: 'Marimar'}
    ];
    PresenceService.findYokoshi = jest.fn(() => Promise.resolve({
        objects: yokoshiSuggestions
    }));

    page.find('#selfCheckinNameSearchInput').simulate('keydown', {keyCode:99});
    expect(PresenceService.findYokoshi).toHaveBeenCalled();
    expect(page.state('suggestions')).toEqual(yokoshiSuggestions);
    page.unmount()
});
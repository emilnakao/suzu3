import * as React from "react";
import { Link } from "react-router";

import "./Sidebar.less";


export interface SidebarProps { }

export class Sidebar extends React.Component<SidebarProps, {}> {
    render() {
        return <div className="sidebar">
                  <ul className="list-group">
                    <li className="list-group-item"><Link to="/">Início</Link></li>
                    <li className="list-group-item"><Link to="/checkin">Check-In</Link></li>
                  </ul>
                </div>;
    }
}

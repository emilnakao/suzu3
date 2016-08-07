import * as React from "react";
import "./Sidebar.less";

export interface SidebarProps { }

export class Sidebar extends React.Component<SidebarProps, {}> {
    render() {
        return <div className="sidebar">
                  <ul className="list-group">
                    <li className="list-group-item"><a href="#">Início</a></li>
                    <li className="list-group-item"><a href="#">Check-in</a></li>
                    <li className="list-group-item"><a href="#">Relatórios</a></li>
                    <li className="list-group-item"><a href="#">Cadastros</a></li>
                  </ul>
                </div>;
    }
}

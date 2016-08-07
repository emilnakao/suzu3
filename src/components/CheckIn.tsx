import * as React from "react";
import "./Home.less";

export interface CheckInProps { compiler: string; framework: string; }

export class CheckIn extends React.Component<CheckInProps, {}> {
    render() {
        return <div className="home title">
                <h1>SUZU 3</h1>
                <h3>Tela de Check-In</h3>
                <h5>2016</h5>
              </div>;
    }
}

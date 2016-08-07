import * as React from "react";
import "./Home.less";

export interface HomeProps { compiler: string; framework: string; }

export class Home extends React.Component<HomeProps, {}> {
    render() {
        return <div className="home title">
                <h1>SUZU 3</h1>
                <h3>Caderno de Presenças Eletrônico</h3>
                <h5>2016</h5>
              </div>;
    }
}

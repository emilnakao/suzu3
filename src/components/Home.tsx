import * as React from "react";

export interface HomeProps { compiler: string; framework: string; }

export class Home extends React.Component<HomeProps, {}> {
    render() {
        return <h1>Olá World from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}

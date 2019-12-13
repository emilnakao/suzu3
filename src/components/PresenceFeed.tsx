import * as React from "react";

/**
 * Exibe todos as presenças marcadas para o evento atual, com atualização automática.
 * @since 1.0
 */
export default class PresenceFeed extends React.Component<{}, {}>{

    constructor(props){
        super(props);
    }


    render(): JSX.Element|any {
        return <div>
            Feed de presenças
        </div>
    }
}

export class PresenceLine extends React.Component<{}, {}>{

    render(): JSX.Element|any {
        return <div></div>
    }
}
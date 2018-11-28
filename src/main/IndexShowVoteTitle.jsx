import * as React from "react";
import {List} from "antd";

export class IndexShowVoteTitle extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
                <List
                    // header={<div>Header</div>}
                    // footer={<div>Footer</div>}
                    bordered
                    dataSource={this.props.votes}
                    renderItem={function (item) {
                        return <List.Item>{item.title}</List.Item>;
                    }}
                />
        )
    }
}
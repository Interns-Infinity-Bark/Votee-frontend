import * as React from "react";
import {IndexShowVoteTitle} from "./IndexShowVoteTitle";
import {Row,Col} from "antd";
import './Index.css'
import { get } from '../utils/request';
import { api } from '../configs';

export class ShowAllVoteInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ongoingVotes: [],
            endedVotes: [],
        };
    }

    async componentDidMount() {
        const ongoingVotesData = await get(`${api.base}/ongoingVotes`);
        ongoingVotesData.status === 'ok' && this.setState({
            ongoingVotes: ongoingVotesData.data.votes,
        });
        const endedVotesData = await get(`${api.base}/endedVotes`);
        endedVotesData.status === 'ok' && this.setState({
            endedVotes: endedVotesData.data.votes,
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={6} offset={4}>
                        <div>
                            <h2 style={{ marginBottom: 26,marginTop:16 }}>正在进行的投票</h2>
                            <IndexShowVoteTitle CheckUrl="" votes={this.state.ongoingVotes} />
                        </div>
                    </Col>
                    <Col span={6} offset={4}>
                        <div>
                            <h2 style={{ marginBottom: 26,marginTop:16  }}>已经结束的投票</h2>
                            <IndexShowVoteTitle CheckUrl="" votes={this.state.endedVotes} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
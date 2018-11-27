import * as React from "react";
import {IndexShowVoteTitle} from "./IndexShowVoteTitle";
import {Row,Col} from "antd";
import './Index.css'

export class ShowAllVoteInfo extends React.Component{
    render() {
        return (
            <div>
                <Row>
                    <Col span={6} offset={4}>
                        <div>
                            <h2 style={{ marginBottom: 26,marginTop:16 }}>正在进行的投票</h2>
                            <IndexShowVoteTitle CheckUrl="" />
                        </div>
                    </Col>
                    <Col span={6} offset={4}>
                        <div>
                            <h2 style={{ marginBottom: 26,marginTop:16  }}>已经结束的投票</h2>
                            <IndexShowVoteTitle CheckUrl="" />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
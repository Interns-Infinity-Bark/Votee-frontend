import * as React from "react";
import {RouteComponentProps} from "react-router";
import {Col, Row, Table} from "antd";
const columns = [{
    title: '选项名称',
    dataIndex: 'text',
},               {
    title: '投票人数所占百分比',
    dataIndex: 'amount',
}];
const voteInfo={
    id:1,
    user:"UMR",
    title:"你纳爷能不能吃鸡？",
    anonymous:0,
    createdAt:new Date(),
    endAt:new Date(),
    updateAt:new Date(),

};
const data=[{
    id:0,
    text:"你纳爷怎么可能能吃鸡呢？",
    amount:25
},          {
    id:1,
    text:"你纳爷打死也不可能吃鸡的",
    amount:25
},          {
    id:2,
    text:"你纳爷吃不了鸡，但是我可以",
    amount:25
},          {
    id:3,
    text:"你纳爷如果变帅了就能吃鸡了hhhhh",
    amount:25
}
];

export class UserShowVoteDetailInfo extends React.Component<RouteComponentProps,{voteId:number}>{
    constructor(props:RouteComponentProps){
        super(props);
        this.state={voteId:this.props.location.state.voteId}
    }
    public render() {
        return (
            <div>
                <h2>{voteInfo.title}</h2>
                <Row>
                    <Col offset={4} span={4}>创建时间：{voteInfo.createdAt.toLocaleTimeString()}</Col>
                    <Col span={4}>创建人：{voteInfo.anonymous?"已匿名":voteInfo.user}</Col>
                    <Col span={4}>结束时间：{voteInfo.endAt.toLocaleTimeString()}</Col>
                    <Col span={4}>最后更新时间：{voteInfo.updateAt.toLocaleTimeString()}</Col>
                </Row>
                <Col style={{paddingTop:"2em"}} span={12} offset={6}>
                    <Table   dataSource={data}  columns={columns} rowKey={"id"}/>
                </Col>
            </div>
        )
    }
}
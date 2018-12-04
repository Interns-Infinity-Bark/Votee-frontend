import * as React from "react";
import {Col, Row, Table} from "antd";
import {get} from "../utils/request";
import {api} from "../configs";
const columns = [{
    title: '选项名称',
    dataIndex: 'text',
},               {
    title: '投票人数',
    dataIndex: 'amount',
}];



export class UserShowVoteDetailInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            voteId:this.props.location.state.voteId,
            data:{
                vote:{
                    createdAt:'',
                    endAt:'',
                    updatedAt:''
                }
            },
            isResult: []
        }
    }

    async componentDidMount() {
        const user = window.__user || {};
        const data = await get(`${api.base}/result/${this.state.voteId}`);
        data.status === 'ok' && this.setState({
            data: data.data,
        });
        const Result = [];
        for (let i = 0; i < this.state.data.result.length; i++) {
            Result.push({
                text:this.state.data.vote.content.options[i],
                amount:this.state.data.result[i],
                id:i,
            })
        }
        this.setState({
            isResult:Result,
        })
    }

    render() {
        return (
            <div>
                <h2>{this.state.data.vote.title}</h2>
                <Row>
                    <Col offset={4} span={4}>创建时间：{this.state.data.vote.createdAt.toString().substring(0,19).replace('T',' ')}</Col>
                    <Col span={4}>创建人：{this.state.data.vote.anonymous?"已匿名":this.state.data.userNickname}</Col>
                    <Col span={4}>结束时间：{this.state.data.vote.endAt.toString().substring(0,19).replace('T',' ')}</Col>
                    <Col span={4}>最后更新时间：{this.state.data.vote.updatedAt.toString().substring(0,19).replace('T',' ')}</Col>
                </Row>
                <Col style={{paddingTop:"2em"}} span={12} offset={6}>
                    <Table   dataSource={this.state.isResult}  columns={columns} rowKey={"id"}/>
                </Col>
            </div>
        )
    }
}
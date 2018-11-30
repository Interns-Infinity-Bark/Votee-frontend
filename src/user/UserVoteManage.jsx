import * as React from "react";
import {NavLink} from "react-router-dom";
import {Button, Col, Divider, Popconfirm, Row, Table} from "antd";
import Search from "antd/lib/input/Search";
import {get} from "../utils/request";
import {del} from "../utils/request";
import {api} from "../configs";


export class UserVoteManage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    async onDelete(id){
        const user = window.__user || {};
        const data = await del(`${api.base}/vote/${id}`);
        if(data.status === 'ok') {
            console.log(data.message);
            const votedata = await get(`${api.base}/user/${user.id}/votes`);
            votedata.status === 'ok' && this.setState({
                data: votedata.data.votes,
            });
        } else {
            console.log(data.message);
        }
    }

    async componentDidMount() {
        const user = window.__user || {};
        const data = await get(`${api.base}/user/${user.id}/votes`);
        data.status === 'ok' && this.setState({
            data: data.data.votes,
        });
    }

    async searchFunction(value) {
        const user = window.__user || {};
        const data = await get(`${api.base}/user/${user.id}/votes?title=${value}`);
        data.status === 'ok' && this.setState({
            data: data.data.votes,
        });
    }

    render(){
        const columns = [{
            title: '我发布的投票',
            dataIndex: 'title',
            key: 'title',
        },               {
            title: '操作',
            key: 'action',
            render: (record) => (
                <span>
        <NavLink to={{
            pathname:'/user/modifyVote',
            state:{
                voteId:record.id
            }
        }}>修改</NavLink>
        <Divider type="vertical" />
        <Popconfirm title="您确定要删除吗?" onConfirm={() => this.onDelete(record.id)}>
            <a>删除</a>
        </Popconfirm>
    </span>
            ),
        }];
        return(
            <div className={"padding-top"}>
                <Row >
                    <Col offset={6} span={10}><Search
                        placeholder="请输入您要搜索的投票名称"
                        onSearch={value => this.searchFunction(value)}
                        enterButton
                    /></Col>
                    <Col span={3}>
                        &emsp;<Button type="primary"><NavLink to={"/user/publishVote"}>发布投票</NavLink></Button>
                    </Col>
                </Row>
                <Row style={{paddingTop:"2em"}}>
                    <Col offset={6} span={12}><Table  dataSource={this.state.data}  columns={columns} rowKey={"id"}/></Col>
                </Row>
            </div>
        )
    }
}
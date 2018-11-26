import * as React from "react";
import {UserVoting} from "./UserVoting";
import {UserShowVoteDetailInfo} from "./UserShowVoteDetailInfo";
import {Table, Divider,Row,Col} from "antd";
import {NavLink} from "react-router-dom";
import Search from "antd/lib/input/Search";


const columns = [{
    title: '我投过的投票',
    dataIndex: 'title',
    key: 'title',
},               {
    title: '操作',
    key: 'action',
    render: (record:any) => (
        <span>
        <NavLink to={{
            pathname:'/user/showDetailInfo',
            state:{
                voteId:record.id
            }
        }}>查看结果</NavLink>
    </span>
    ),
}];

const data = [{
    id:1,
    title:'blue 帅不帅',
},            {
    id:2,
    title:'你纳爷帅不帅',
},            {
    id:3,
    title:'今天老子能不能吃鸡'
}];

export class UserShowMyVotes extends React.Component{
    public render() {
        return (
            <div className={"padding-top"}>
                <Row >
                    <Col offset={6} span={12}><Search
                        placeholder="请输入您要搜索的投票名称"
                        onSearch={value => console.log(value)}
                        enterButton
                    /></Col>
                </Row>
                <Row style={{paddingTop:"2em"}}>
                    <Col offset={6} span={12}><Table  dataSource={data}  columns={columns} rowKey={"id"}/></Col>
                </Row>
            </div>
        )
    }
}
import * as React from "react";
import {NavLink} from "react-router-dom";
import {Button, Col, Divider, Popconfirm, Row, Table} from "antd";
import Search from "antd/lib/input/Search";

function onDelete(id){
        alert(id);
}
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
        <Popconfirm title="您确定要删除吗?" onConfirm={() => onDelete(record.id)}>
            <a>删除</a>
        </Popconfirm>
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

export class UserVoteManage extends React.Component{

    render(){
        return(
            <div className={"padding-top"}>
                <Row >
                    <Col offset={6} span={10}><Search
                        placeholder="请输入您要搜索的投票名称"
                        onSearch={value => console.log(value)}
                        enterButton
                    /></Col>
                    <Col span={3}>
                        &emsp;<Button type="primary"><NavLink to={"/user/publishVote"}>发布投票</NavLink></Button>
                    </Col>
                </Row>
                <Row style={{paddingTop:"2em"}}>
                    <Col offset={6} span={12}><Table  dataSource={data}  columns={columns} rowKey={"id"}/></Col>
                </Row>
            </div>
        )
    }
}
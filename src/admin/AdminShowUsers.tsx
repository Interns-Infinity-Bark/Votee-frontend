import * as React from "react";
import {Table, Row, Col, Icon, Switch} from "antd";
import {NavLink} from "react-router-dom";
import Search from "antd/lib/input/Search";


const columns = [{
    title: '用户列表',
    dataIndex: 'email',
    key: 'email',
},               {
    title: '是否禁用',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (record:any) => (
        <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />}
                defaultChecked={record.isActive} />
    ),
}];

const data = [{
    id:1,
    title:'blue',
    isActive:true
},            {
    id:2,
    title:'umr',
    isActive:true
},            {
    id:3,
    title:'pbh',
    isActive:true
}];

export class AdminShowUsers extends React.Component{
    public render() {
        return (
            <div className={"padding-top"}>
                <Row >
                    <Col offset={6} span={12}><Search
                        placeholder="请输入您要搜索的用户名称"
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
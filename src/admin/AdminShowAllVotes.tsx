import * as React from "react";
import {Table, Row, Col, Icon, Switch} from "antd";
import Search from "antd/lib/input/Search";


const columns = [{
    title: '所有投票',
    dataIndex: 'title',
    key: 'title',
},               {
    title: '是否禁用',
    dataIndex:'isActive',
    key: 'forbid',
    render: (record:any) => (
     <span>
         <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />}
                 defaultChecked={record.isActive} />
    </span>
    ),
}];

const data = [{
    id:1,
    title:'blue 帅不帅',
    isActive:true
},            {
    id:2,
    title:'你纳爷帅不帅',
    isActive:true
},            {
    id:3,
    title:'今天老子能不能吃鸡',
    isActive:true
}];

export class AdminShowAllVotes extends React.Component{
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
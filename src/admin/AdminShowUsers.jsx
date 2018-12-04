import * as React from "react";
import {Table, Row, Col, Icon, Switch} from "antd";
import {NavLink} from "react-router-dom";
import Search from "antd/lib/input/Search";
import { get, put } from '../utils/request';
import { api } from '../configs';


async function onActiveChange(record, checked) {
    const url = checked ? `${api.admin}/disableUser` : `${api.admin}/enableUser`;
    const data = await put(url, {
        userId: record.id,
    });
    if (data.status !== 'ok') {
        alert('修改失败，请稍后再试呢');
    }
}

async function onRoleChange(record, checked) {
    const url = checked ? `${api.admin}/enableManager` : `${api.admin}/disableManager`;
    const data = await put(url, {
        userId: record.id,
    });
    if (data.status !== 'ok') {
        alert('修改失败，请稍后再试呢');
    }
}

const columns = [
    {
        title: '用户列表',
        dataIndex: 'nickname',
        key: 'nickname',
    },
    {
        title: '是否禁用',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (isActive, record) => (
            <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />}
                    defaultChecked={!isActive} onChange={onActiveChange.bind(this, record)} />
        ),
    },
    {
        title: '是否管理人',
        dataIndex: 'role',
        key: 'role',
        render: (role, record) => (
            <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />}
                    defaultChecked={role === 'manager'} onChange={onRoleChange.bind(this, record)} />
        ),
    },
];

export class AdminShowUsers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    async componentDidMount() {
        const data = await get(`${api.admin}/users`);
        data.status === 'ok' && this.setState({
            data: data.data.users,
        });
    }

    onSearchUsers = async value => {
        const data = await get(`${api.admin}/users?nickname=${value}`);
        data.status === 'ok' && this.setState({
            data: data.data.users,
        });
    };

    render() {
        return (
            <div className={"padding-top"}>
                <Row >
                    <Col offset={6} span={12}><Search
                        placeholder="请输入您要搜索的用户名称"
                        onSearch={this.onSearchUsers}
                        enterButton
                    /></Col>
                </Row>
                <Row style={{paddingTop:"2em"}}>
                    <Col offset={6} span={12}><Table  dataSource={this.state.data}  columns={columns} rowKey={"id"}/></Col>
                </Row>
            </div>
        )
    }
}
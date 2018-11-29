import * as React from "react";
import {Table, Row, Col, Icon, Switch} from "antd";
import Search from "antd/lib/input/Search";
import { get, put } from '../utils/request';
import { api } from '../configs';

async function onActiveChange(record, checked) {
    const url = checked ? `${api.admin}/disableVote` : `${api.admin}/enableVote`;
    const data = await put(url, {
        voteId: record.id,
    });
    if (data.status !== 'ok') {
        alert('修改失败，请稍后再试呢');
    }
}

const columns = [
    {
        title: '所有投票',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '是否禁用',
        dataIndex:'isActive',
        key: 'forbid',
        render: (isActive, record) => (
         <span>
             <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />}
                     defaultChecked={!isActive} onChange={onActiveChange.bind(this, record)} />
        </span>
        ),
    },
];

export class AdminShowAllVotes extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    async componentDidMount() {
        const data = await get(`${api.base}/votes`);
        data.status === 'ok' && this.setState({
            data: data.data.votes,
        });
    }

    onSearchVotes = async value => {
        const data = await get(`${api.base}/votes?title=${value}`);
        data.status === 'ok' && this.setState({
            data: data.data.votes,
        });
    };

    render() {
        return (
            <div className={"padding-top"}>
                <Row >
                    <Col offset={6} span={12}><Search
                        placeholder="请输入您要搜索的投票名称"
                        onSearch={this.onSearchVotes}
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
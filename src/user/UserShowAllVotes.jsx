import * as React from "react";
import {Table, Divider,Row,Col} from "antd";
import {NavLink} from "react-router-dom";
import Search from "antd/lib/input/Search";


const columns = [{
    title: '所有投票',
    dataIndex: 'title',
    key: 'title',
},               {
    title: '操作',
    key: 'action',
    render: (record) => (
     <span>
        <NavLink to={{
          pathname:'/user/voting',
          state:{
              voteId:record.id
          }
      }}>投票</NavLink>
        <Divider type="vertical" />
        <NavLink to={{
            pathname:'/user/showDetailInfo',
            state:{
                voteId:record.id
            }
        }}>查看结果</NavLink>
    </span>
    ),
}];



export class UserShowAllVotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
            ],
        };
    }

    componentDidMount() {
        const url="http://123.206.15.249:3000/votes";
        fetch(url,{
            credentials: 'include',
            method:'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(data => {
            console.log(data);
            this.setState({
                data,
            });
        })
    }
    render() {
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
                    <Col offset={6} span={12}><Table  dataSource={this.state.data.votes}  columns={columns} rowKey={"id"}/></Col>
                </Row>
            </div>
        )
    }
}
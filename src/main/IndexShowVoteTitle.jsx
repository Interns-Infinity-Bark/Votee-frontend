
import * as React from "react";
import {List} from "antd";
// 测试用数据，真实情况CheckUrl直接请求数据
let testList = [
    {id:1,title:"我帅不帅"},
    {id:2,title:"blue帅不帅"},
    {id:3,title:"你纳爷今天能不能吃鸡"},
    {id:4,title:"如何才能变得像blue一样强"}];
export class IndexShowVoteTitle extends React.Component{
    constructor(props){
        super(props);
        // 这里只是测试用
        this.state = {voteInfoList:[]};
    }
    // 挂载时调用
    componentDidMount(){
        this.getData();
        console.log('hhhhh');
    }
    // 数据更新时调用
    componentDidUpdate(){
        // this.getData()
    }
    // 获取数据
    getData(){
        // fetch(this.props.CheckUrl,(err,data))
        this.setState({voteInfoList:testList});
    }
    render() {
        return(
                <List
                    // header={<div>Header</div>}
                    // footer={<div>Footer</div>}
                    bordered
                    dataSource={this.state.voteInfoList}
                    renderItem={function (item) {
                        return <List.Item>{item.title}</List.Item>;
                    }}
                />
        )
    }
}
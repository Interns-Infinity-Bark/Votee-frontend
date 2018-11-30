import * as React from "react";
import {Col, Row, Radio, Switch, Icon, Button} from "antd";
import {post} from "../utils/request";
import {api} from "../configs";

const RadioGroup = Radio.Group;

export class UserVoting extends React.Component{
    constructor(props){
        super(props);
        this.state={
            voteId:this.props.location.state.voteId,
            value:0,
            voteInfo:this.props.location.state.data
        }
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    onSubmit = async () =>{
        const data = await post(`${api.base}/userVote`,{
            voteId: this.state.voteId,
            option: this.state.value,
        });
        alert(data.message);
        if(data.status === 'ok') {
            this.props.history.push('/user');
        }
    };
    render() {
        const radioStyle = {
            display: 'block',
            height: '3em',
            lineHeight: '3em',
        };
        return (
            <div>
                <h2>{this.state.voteInfo.title}</h2>
                <Row>
                    <Col offset={2} span={5}>创建时间：{this.state.voteInfo.createdAt.toString().substring(0,19).replace('T',' ')}</Col>
                    <Col span={5}>创建人：{this.state.voteInfo.anonymous?"已匿名":this.state.voteInfo.userNickname}</Col>
                    <Col span={5}>结束时间：{this.state.voteInfo.endAt.toString().substring(0,19).replace('T',' ')}</Col>
                    <Col span={5}>最后更新时间：{this.state.voteInfo.updatedAt.toString().substring(0,19).replace('T',' ')}</Col>
                </Row>
                <Row className={"showContent"}>
                    <Col offset={8} span={8}>
                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                            {this.state.voteInfo.content.options.map((item,index) => (
                                <Radio style={radioStyle} value={index} key={index}>{item}</Radio>
                            ))}
                        </RadioGroup>
                    </Col>
                </Row>
                <Row className={"padding-top"}>
                    <Col offset={8}><Button type="primary" onClick={this.onSubmit} >提交</Button></Col>
                </Row>
            </div>
        )
    }
}
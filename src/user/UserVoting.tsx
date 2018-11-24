import * as React from "react";
import {RouteComponentProps} from "react-router";
import {Col, Row, Radio, Switch, Icon, Button} from "antd";

const RadioGroup = Radio.Group;

const voteInfo={
    id:1,
    user:"UMR",
    title:"你纳爷能不能吃鸡？",
    content: {
        optionIds: [0, 1, 2, 3],
        texts: [
            "你纳爷怎么可能能吃鸡呢？",
            "你纳爷打死也不可能吃鸡的",
            "你纳爷吃不了鸡，但是我可以",
            "你纳爷如果变帅了就能吃鸡了hhhhh"
        ]
    },
    anonymous:0,
    createdAt:new Date(),
    endAt:new Date(),
    updateAt:new Date()
};

export class UserVoting extends React.Component<RouteComponentProps,{voteId:number,value:number}>{
    constructor(props:RouteComponentProps){
        super(props);
        this.state={voteId:this.props.location.state.voteId,value:0}
    }
    public onChange = (e:any) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    public onSubmit = () =>{
        alert("提交成功！");
        console.log(this.state.value);
        this.props.history.push('/user')
    };
    public render() {
        const radioStyle = {
            display: 'block',
            height: '3em',
            lineHeight: '3em',
        };
        return (
            <div>
                {/*<p>id为：{this.state.voteId}的投票信息</p>*/}
                <h2>{voteInfo.title}</h2>
                <Row>
                    <Col offset={4} span={4}>创建时间：{voteInfo.createdAt.toLocaleTimeString()}</Col>
                    <Col span={4}>创建人：{voteInfo.anonymous?"已匿名":voteInfo.user}</Col>
                    <Col span={4}>结束时间：{voteInfo.endAt.toLocaleTimeString()}</Col>
                    <Col span={4}>最后更新时间：{voteInfo.updateAt.toLocaleTimeString()}</Col>
                </Row>
                <Row className={"showContent"}>
                    <Col offset={8} span={8}>
                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                            {voteInfo.content.optionIds.map(item => (
                                <Radio style={radioStyle} value={item} key={item}>{voteInfo.content.texts[item]}</Radio>
                            ))}
                        </RadioGroup>
                    </Col>
                </Row>
                <Row className={"showFooter"}>
                    <Col offset={8} span={3}>
                        是否匿名：<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />}
                                defaultChecked />
                    </Col>
                </Row>
                <Row className={"padding-top"}>
                    <Col offset={8}><Button type="primary" onClick={this.onSubmit} >提交</Button></Col>
                </Row>
            </div>
        )
    }
}
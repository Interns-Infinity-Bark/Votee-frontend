/// <reference path="./userInterfaces.d.ts"/>
import * as React from "react";

import {UserTitle} from './UserTitle'
import { Route, Switch,RouteComponentProps} from 'react-router-dom'

import { Layout} from 'antd';
import {UserShowAllVotes} from "./UserShowAllVotes";
import {UserShowVoteDetailInfo} from "./UserShowVoteDetailInfo";
import {UserVoting} from "./UserVoting";
import {UserShowMyVotes} from "./UserShowMyVotes";
import {UserVoteManage} from "./UserVoteManage";
import {UserModifyVote} from "./UserModifyVote";
import {UserPublishVote} from "./UserPublishVote";


const { Content, Footer } = Layout;

export class UserMain extends React.Component<RouteComponentProps,IUserMainState>{
    constructor(props:RouteComponentProps){
        super(props);
        // this.state={id:1,nickName:this.props.location.state.values.userName}
    }
    public render() {
        return (
        <Layout className="layout">
            <UserTitle id={2} nickName={"UMR"}/>
                <Content style={{ padding: '0 50px'}}>
                    <div style={{ background: '#fff', padding: 24,minHeight:550 }}>
                        {/*<Prompt message="你确定要离开当前页面吗？" />*/}
                        <Switch>
                            <Route  exact path = "/user" component={UserShowAllVotes}/>
                            <Route exact path = "/user/showMyVotes" component={UserShowMyVotes}/>
                            <Route path = "/user/showDetailInfo" component={UserShowVoteDetailInfo}/>
                            <Route path = "/user/showMyVotes/DetailInfo" component={UserShowVoteDetailInfo}/>
                            <Route path = "/user/voting" component={UserVoting}/>
                            <Route path="/user/voteManage" component={UserVoteManage}/>
                            <Route path="/user/modifyVote" component={UserModifyVote}/>
                            <Route path="/user/publishVote" component={UserPublishVote}/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center'}}>
                    Votee ©2018 Created by UMR
                </Footer>
        </Layout>
        )
    }
}
import * as React from "react";

import {UserTitle} from './UserTitle'
import { Route, Switch,RouteComponentProps} from 'react-router-dom'

import { Layout} from 'antd';
import {UserShowAllVotes} from "./UserShowAllVotes";
import {UserShowVoteDetailInfo} from "./UserShowVoteDetailInfo";
import {UserVoting} from "./UserVoting";
import {UserShowMyVotes} from "./UserShowMyVotes";


const { Content, Footer } = Layout;

export class UserMain extends React.Component<RouteComponentProps,{userName:string}>{
    constructor(prop:RouteComponentProps){
        super(prop);
        this.state={userName:this.props.location.state.values.userName}
    }
    public render() {
        return (
        <Layout className="layout">
            <UserTitle id={2} nickName={this.state.userName}/>
                <Content style={{ padding: '0 50px'}}>
                    <div style={{ background: '#fff', padding: 24,minHeight:550 }}>
                        {/*<Prompt message="你确定要离开当前页面吗？" />*/}
                        <Switch>
                            <Route  exact path = "/user" component={UserShowAllVotes}/>
                            <Route path = "/user/showMyVotes" component={UserShowMyVotes}/>
                            <Route path = "/user/showDetailInfo" component={UserShowVoteDetailInfo}/>
                            <Route path = "/user/voting" component={UserVoting}/>
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
/// <reference path="./indexInterfaces.d.ts"/>
import * as React from "react";

import {IndexTitle} from './IndexTitle'
import {ShowAllVoteInfo} from "./ShowAllVoteInfo";
import {Login} from "./Login";
import {Register} from "./Register";
import { Route, Switch} from 'react-router-dom'

import { Layout} from 'antd';
const { Content, Footer } = Layout;

export class IndexMain extends React.Component{
    public render() {
        return (
        <Layout className="layout">
            <IndexTitle/>
                <Content style={{ padding: '0 50px'}}>
                    <div style={{ background: '#fff', padding: 24,minHeight:550 }}>
                        {/*<Prompt message="你确定要离开当前页面吗？" />*/}
                        <Switch>
                        <Route  exact path = "/index" component={ShowAllVoteInfo}/>
                        <Route  path = "/index/login" component = {Login}/>
                        <Route  path = "/index/register" component = {Register}/>
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
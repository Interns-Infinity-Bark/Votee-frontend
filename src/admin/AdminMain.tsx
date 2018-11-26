
import * as React from "react";

import { Route, Switch} from 'react-router-dom'

import { Layout} from 'antd';
import {AdminTitle} from "./AdminTitle";
import {AdminShowUsers} from "./AdminShowUsers";
import {AdminShowAllVotes} from "./AdminShowAllVotes";
const { Content, Footer } = Layout;

export class AdminMain extends React.Component{
    public render() {
        return (
        <Layout className="layout">
            <AdminTitle id={1} nickName={"Ninaye"}/>
                <Content style={{ padding: '0 50px'}}>
                    <div style={{ background: '#faffff', padding: 24,minHeight:550 }}>
                        {/*<Prompt message="你确定要离开当前页面吗？" />*/}
                        <Switch>
                        <Route  exact path = "/admin" component={AdminShowUsers}/>
                        <Route  path = "/admin/showAllVotes" component = {AdminShowAllVotes}/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center'}}>
                    Votee ©2018 Created by barks
                </Footer>
        </Layout>
        )
    }
}
import * as React from "react";

import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {IndexMain} from "./main/IndexMain";
import {AdminLogin} from "./admin/AdminLogin";
import {UserMain} from "./user/UserMain";
import {AdminMain} from "./admin/AdminMain";
import {get} from './utils/request';
import {api} from './configs/';

export class Main extends React.Component{
    // ...

    // 骚代码，不要试图删除或理解
    user = window.__user;
    admin = window.__admin;
    timer = null;

    async componentDidMount() {
        this.timer = setInterval(() => {
            let hasChange = false;
            if (this.user !== window.__user) {
                this.user = window.__user;
                hasChange = true;
            }
            if (this.admin !== window.__admin) {
                this.admin = window.__admin;
                hasChange = true;
            }
            hasChange && this.forceUpdate();
        }, 1000);
        const userData = await get(`${api.base}/`);
        if (userData.status === 'ok') {
            window.__user = userData.data.user;
        }
        const adminData = await get(`${api.admin}/`);
        if (adminData.status === 'ok') {
            window.__admin = adminData.data.user;
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Redirect exact from='/'  to='/index' />
                    <Route path="/index" component={IndexMain} />
                    <Route path="/admin/login" component={AdminLogin}/>
                    <Route  path="/user" component={UserMain} />
                    <Route  path="/admin" component={AdminMain} />
                    {/*<Route  path="/superAdmin" component={SuperAdminMain} />*/}
                </Switch>
            </Router>
        )
    }
}

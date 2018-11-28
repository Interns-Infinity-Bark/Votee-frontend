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
    timer = null;

    async componentDidMount() {
        this.timer = setInterval(() => {
            if (this.user !== window.__user) {
                this.user = window.__user;
                this.forceUpdate();
            }
        }, 1000);
        const data = await get(`${api.base}/`);
        if (data.status === 'ok') {
            window.__user = data.data.user;
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

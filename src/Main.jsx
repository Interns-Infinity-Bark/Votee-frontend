import * as React from "react";

import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {IndexMain} from "./main/IndexMain";
import {AdminLogin} from "./admin/AdminLogin";
import {UserMain} from "./user/UserMain";
import {AdminMain} from "./admin/AdminMain";
import {get} from './utils/request';
import {api} from './configs/';

export class Main extends React.Component{
    async componentDidMount() {
        const data = await get(`${api.base}/`);
        if (data.status === 'ok') {
            window.__user = data.data.user;
        }
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

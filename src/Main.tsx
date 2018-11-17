import * as React from "react";

import {BrowserRouter as Router, Switch, Route, Redirect,RouteComponentProps } from 'react-router-dom'
import {IndexMain} from "./main/IndexMain";
import {AdminLogin} from "./main/AdminLogin";
import {UserMain} from "./user/UserMain";

export class Main extends React.Component{
    public render() {
        return (
            <Router>
                <Switch>
                    <Redirect exact from='/'  to='/index' />
                    <Route path="/index" component={IndexMain} />
                    <Route path="/admin/login" component={AdminLogin}/>
                    <Route  path="/user" component={UserMain} />
                    {/*<Route  path="/admin" component={AdminMain} />*/}
                    {/*<Route  path="/superAdmin" component={SuperAdminMain} />*/}
                </Switch>
            </Router>
        )
    }
}

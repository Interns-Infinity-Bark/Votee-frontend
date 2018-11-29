import * as React from "react";

import { NavLink, Prompt, withRouter } from 'react-router-dom'
import {Menu, Layout, Col, Row} from 'antd'
import { get } from '../utils/request';
import { api } from '../configs';
const {Header} = Layout;
const flag = false;

class AdminTitle extends React.Component{
    logout = () => {
        get(`${api.admin}/logout`);
        this.props.history.push('/index');
        window.__admin = null;
    };

    render() {
        const admin = window.__admin || {};
        return (
            <Header>
                <Row>
                    <Col span={8}>
                <div className="logo" />
                <label className="welcome">欢迎您，{admin.nickname}</label>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[window.location.pathname]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="/admin"><NavLink to="/admin">查看用户列表</NavLink></Menu.Item>
                    <Menu.Item key="/admin/showAllVotes"><NavLink to="/admin/showAllVotes">查看投票列表</NavLink></Menu.Item>
                </Menu>
                    </Col>
                    <Col span={1} offset={14} className={"logout"}>
                        <Prompt message={location => {
                            const isApp = location.pathname.indexOf("/admin");
                            return isApp ? `你确定要退出吗？` : true;
                        }} />
                        <a onClick={this.logout}>登出</a>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default withRouter(AdminTitle);

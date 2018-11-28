import './user.css';
import {get} from '../utils/request';
import {api} from '../configs/';
import * as React from "react";

// 首先我们需要导入一些组件...
import {NavLink, Prompt, withRouter} from 'react-router-dom'
import {Menu, Layout, Col, Row} from 'antd'
const {Header} = Layout;

const flag = false;

class UserTitle extends React.Component {
    logout = () => {
        get(`${api.base}/logout`);
        this.props.history.push('/index');
        window.__user = null;
    };

    render() {
        const user = window.__user || {};
        return (
            <Header>
                <Row>
                    <Col span={8}>
                <div className="logo" />
                <label className="welcome">欢迎您，{user.nickname}</label>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[window.location.pathname]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="/user"><NavLink to="/user">查看投票列表</NavLink></Menu.Item>
                    <Menu.Item key="/user/showMyVotes"><NavLink to="/user/showMyVotes">查看我的投票</NavLink></Menu.Item>
                    <Menu.Item key="/user/voteManage"><NavLink to={flag?window.location.pathname:"/user/voteManage"}/>投票管理</Menu.Item>
                </Menu>
                    </Col>
                    <Col span={1} offset={14} className={"logout"}>
                        <Prompt message={location => {
                            const isApp = location.pathname.indexOf("/user");
                            return isApp ? `你确定要退出吗？` : true;
                        }} />
                        <a onClick={this.logout}>登出</a>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default withRouter(UserTitle);

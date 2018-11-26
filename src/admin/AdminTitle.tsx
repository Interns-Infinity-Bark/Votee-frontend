/// <reference path="./adminInterfaces.d.ts"/>
import * as React from "react";

// 首先我们需要导入一些组件...
import {NavLink, Prompt} from 'react-router-dom'
import {Menu, Layout, Col, Row} from 'antd'
const {Header} = Layout;
const flag = false;

export class AdminTitle extends React.Component<IAdminTitleProps>{
    public render() {
        return (
            <Header>
                <Row>
                    <Col span={8}>
                <div className="logo" />
                <label className="welcome">欢迎您，{this.props.nickName}</label>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[location.pathname]}
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
                        <NavLink to={"/index"}>登出</NavLink>
                    </Col>
                </Row>
            </Header>
        )
    }
}
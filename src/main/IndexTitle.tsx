import * as React from "react";

// 首先我们需要导入一些组件...
import {NavLink} from 'react-router-dom'
import {Menu, Layout} from 'antd'
const {Header} = Layout;


export class IndexTitle extends React.Component{
    public render() {
        return (
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[location.pathname]}
                    style={{ lineHeight: '64px' }}
                >
                        <Menu.Item key="/index"><NavLink to="/index">欢迎来到votee</NavLink></Menu.Item>
                        <Menu.Item key="/index/login"><NavLink to="/index/login">请登录</NavLink></Menu.Item>
                        <Menu.Item key="/index/register"><NavLink to="/index/register">免费注册</NavLink></Menu.Item>
                </Menu>
            </Header>
        )
    }
}
import * as React from "react";

// 首先我们需要导入一些组件...
import {NavLink} from 'react-router-dom'
import {Menu, Layout} from 'antd'
const {Header} = Layout;
import './user.css'

export class UserTitle extends React.Component<IUserTitleProps>{
    public render() {
        return (
            <Header>
                <div className="logo" />
                <label className="welcome">欢迎您，{this.props.nickName}</label>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[location.pathname]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="/user"><NavLink to="/user">查看投票列表</NavLink></Menu.Item>
                    <Menu.Item key="/user/showMyVotes"><NavLink to="/user/showMyVotes">查看我的投票</NavLink></Menu.Item>
                </Menu>
            </Header>
        )
    }
}
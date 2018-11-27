import * as React from "react";

import { Form, Icon, Input, Button} from 'antd';
import FormItem from "antd/lib/form/FormItem";
import {NavLink} from "react-router-dom";

import "./Index.css"

class LoginForm extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //请求的url
                const url="http://123.206.15.249:3000/login";
                //请求的参数
                const param={
                    email:values.userName,
                    password:values.password
                };
                //调用fetch
                fetch(url,{
                    credentials: 'include',
                    //请求方式
                    method:'POST',
                    //将请求的参数转成json
                    body:JSON.stringify(param) ,
                    //请求头
                    headers: {
                        'content-type': 'application/json'
                    }
                    // 请求的返回值
                }).then(function (response) {
                    return response.json();
                }).then(data => {
                    if(data.status === "ok") {
                        alert('登录成功');
                        this.props.history.push('/user');
                        window.__user = data.data.user;
                    } else {
                        alert('登录失败');
                    }
                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
                <div className="container">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入您的用户名!' }],
                            })
                            (<Input
                                prefix={<Icon type="user" style={{ color:'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入用户名"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入您的密码!' }],
                            })(<Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            或者 <NavLink to={"/index/register"}>现在注册!</NavLink>
                        </FormItem>
                    </Form>
                </div>
        )
    }
}
export const Login = Form.create()(LoginForm);

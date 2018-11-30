import "./Index.css"
import * as React from "react";
import { Form, Icon, Input, Button} from 'antd';
import FormItem from "antd/lib/form/FormItem";
import {NavLink} from "react-router-dom";
import {post} from '../utils/request';
import { api } from '../configs';

class LoginForm extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const data = await post(`${api.base}/login`, {
                    email: values.userName,
                    password: values.password,
                });
                if (data.status === 'ok') {
                    alert('登录成功');
                    this.props.history.push('/user');
                    window.__user = data.data.user;
                }
                else {
                    alert(data.message);
                }
            }
        });
    };

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

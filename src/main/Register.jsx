import * as React from "react";

import { Form, Input, Tooltip, Icon,  Button } from 'antd';
import {NavLink} from "react-router-dom";
import { post } from '../utils/request';
import { api } from '../configs/';

const FormItem = Form.Item;

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const data = await post(`${api.base}/register`, {
                    email: values.email,
                    password: values.password,
                    confirmPassword: values.confirm,
                    nickname: values.nickname,
                });
                if (data.status === 'ok') {
                    alert('注册成功');
                    this.props.history.push('/user');
                    window.__user = data.data.user;
                } else {
                    alert(data.message);
                }
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: { span: 10 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 7,
                },
            },
        };
        return (
            <div style={{marginTop:"2em"}}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="邮箱&用户名">
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            },      {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })
                        (<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="密码" >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            },      {
                                validator: this.validateToNextPassword,
                            }],
                        })
                        (<Input type="password" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="确认密码" >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            },      {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={(
                        <span>昵称&nbsp;
                            <Tooltip title="您想让人怎么称呼您?"><Icon type="question-circle-o" /></Tooltip>
                        </span>)}>
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                        })
                        (<Input />)}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">立即注册</Button>
                        已有账号？<NavLink to={"/index/login"}>立即登录!</NavLink>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export const Register = Form.create()(RegisterForm);
import * as React from "react";

import { Form, Icon, Input, Button} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import FormItem from "antd/lib/form/FormItem";
import {NavLink,RouteComponentProps} from "react-router-dom";
interface ILoginFormProps extends FormComponentProps,RouteComponentProps{
}

import "./Index.css"

class LoginForm extends React.Component<ILoginFormProps>{
    public handleSubmit = (e:any) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 表单提交的数据是values
                console.log('Received values of form: ', values);
                if(values.userName === "UMR" && values.password === "123"){
                    alert('登录成功');
                    this.props.history.push('/user',{values})
                }
                else { alert('用户名或密码错误！') }
            }
        });
    }
    public render() {
        const { getFieldDecorator } = this.props.form;
        return (
                <div className="container">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })
                            (<Input
                                prefix={<Icon type="user" style={{ color:'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入用户名"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
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

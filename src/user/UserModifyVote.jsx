import * as React from 'react'
import {Button, Form, Icon, Input, Switch,DatePicker} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {IconProps} from "antd/lib/icon";
import moment from "moment"
const FormItem = Form.Item;

class UserModifyVoteForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:"你纳爷能不能吃鸡",
            content: [
                "你纳爷怎么可能能吃鸡呢？",
                "你纳爷打死也不可能吃鸡的",
                "你纳爷吃不了鸡，但是我可以",
                "你纳爷如果变帅了就能吃鸡了hhhhh"
            ],
            private:true,
            password:"123",
            anonymous:false,
            endAt:new Date()
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            const values = {
                ...fieldsValue,
                'endAt': fieldsValue['endAt'].format('YYYY-MM-DD HH:mm:ss'),
            };
            console.log('Received values of form: ', values);
        });
    };
    render(){
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 8,
                    offset: 8,
                },
            },
        };
        getFieldDecorator('optionIds', { initialValue: this.state.content.optionIds });
        const keys = getFieldValue('optionIds');
        const formItems = this.state.content.map((text, index) => {
            return (
                <FormItem
                    {...formItemLayout}
                    label={'选项'.concat((index+1).toString())}
                    required={false}
                    key={index}
                >
                    {getFieldDecorator(`content[${index}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "请输入这个选项名或者删除这个选项！",
                        }],
                        initialValue:text
                    })(
                        <Input placeholder="请输入选项内容" style={{ width: '95%', marginRight: 8 }} disabled={true}/>
                    )}
                </FormItem>
            );
        });
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间！' }],
            initialValue:moment(this.state.endAt,"YYYY-MM-DD HH:mm:ss")
        };
        return (


            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="标题："
                >
                    {getFieldDecorator('title', {
                        rules: [{
                            required: true, message: '请输入投票标题!',
                            whitespace: true
                        }],
                        initialValue:this.state.title
                    })(
                        <Input placeholder={"请输入标题"} />
                    )}
                </FormItem>
                {formItems}
                <FormItem
                    {...formItemLayout}
                    label="是否私有："
                >
                    {getFieldDecorator('private', {valuePropName:'checked',initialValue:this.state.private})(
                        <Switch
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                            onChange={()=>{this.setState({private:!this.state.private})}}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码："
                >
                    {getFieldDecorator('password', {
                        initialValue:this.state.password
                    })(<Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        disabled={!this.state.private}
                        type="password" placeholder="请输入密码" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="是否匿名："
                >
                    {getFieldDecorator('anonymous', {valuePropName:'checked',initialValue:this.state.anonymous})(
                        <Switch
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="投票结束时间"
                >
                    {getFieldDecorator('endAt', config)(
                        <DatePicker placeholder={"选择投票结束时间"} showTime format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">发布投票</Button>
                </FormItem>
            </Form>
        )
    }
}
export const UserModifyVote = Form.create()(UserModifyVoteForm);
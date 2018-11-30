import * as React from 'react'
import {Button, Form, Icon, Input, Switch,DatePicker} from "antd";
import moment from "moment"
import {get, post, put} from "../utils/request";
import {api} from "../configs";
const FormItem = Form.Item;

class UserModifyVoteForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            password:"",
            private:"",
            voteinfo: {
                content: {
                    options: [],
                }
            }
        }
    }

    async componentDidMount() {
        const voteId = this.props.location.state.voteId;
        const data = await get(`${api.base}/vote/${voteId}`);
        data.status === 'ok' && this.setState({
            voteinfo: data.data.vote,
        });
        console.log(this.state.voteinfo);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, fieldsValue) => {
            if (err) {
                return;
            }
            const values = {
                ...fieldsValue,
                'endAt': fieldsValue['endAt'].format('YYYY-MM-DD HH:mm:ss'),
            };

            console.log('Received values of form: ', values);

            const voteId = this.props.location.state.voteId;
            const data = await put(`${api.base}/vote/${voteId}`, values);
            if (data.status === 'ok') {
                alert(data.message);
                this.props.history.push('/user/voteManage');
            }
            else {
                alert(data.message);
            }

        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
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

        const formItems = this.state.voteinfo.content.options.map((text, index) => {
            return (
                <FormItem
                    {...formItemLayout}
                    label={'选项'.concat((index+1).toString())}
                    required={false}
                    key={index}
                >
                    {getFieldDecorator(`content.options[${index}]`, {
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
            initialValue:moment(this.state.voteinfo.endAt,"YYYY-MM-DD HH:mm:ss")
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
                        initialValue:this.state.voteinfo.title
                    })(
                        <Input placeholder={"请输入标题"} />
                    )}
                </FormItem>
                {formItems}
                <FormItem
                    {...formItemLayout}
                    label="是否私有："
                >
                    {getFieldDecorator('isPrivate', {valuePropName:'checked',initialValue:this.state.voteinfo.private})(
                        <Switch
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                            onChange={()=>{this.setState({private:!this.state.voteinfo.private})}}
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
                    {getFieldDecorator('anonymous', {valuePropName:'checked',initialValue:this.state.voteinfo.anonymous})(
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
                    <Button type="primary" htmlType="submit">修改投票</Button>
                </FormItem>
            </Form>
        )
    }
}
export const UserModifyVote = Form.create()(UserModifyVoteForm);
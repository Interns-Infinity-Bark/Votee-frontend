import * as React from 'react'
import {Button, Form, Icon, Input, Switch,DatePicker} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {IconProps} from "antd/lib/icon";
const FormItem = Form.Item;
interface IUserPublishVoteProps extends FormComponentProps,IconProps{
}

class UserPublishVoteForm extends React.Component<IUserPublishVoteProps,IUserVoteInfoState>{
    constructor(props:IUserPublishVoteProps){
        super(props);
        this.state={
            title:"",
            content:[],
            private:true,
            password:"",
            anonymous:false,
            endAt:new Date()
        }
    }
    componentDidMount(){
        this.add();
    }
    remove = (k:any) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('optionIds');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            optionIds: keys.filter((key:any) => {
                return key !== k;
            }),
        });
    };
    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('optionIds');
        const nextKeys = keys.concat(keys.length);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            optionIds: nextKeys,
        });
    };
    handleSubmit = (e:any) => {
        e.preventDefault();
        this.props.form.validateFields((err:any, fieldsValue:any) => {
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
    public render(){
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
        getFieldDecorator('optionIds', { initialValue: [] });
        const keys = getFieldValue('optionIds');
        const formItems = keys.map((k:number, index:number) => {
            return (
                <FormItem
                    {...formItemLayout}
                    label={'选项'.concat((index+1).toString())}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`texts[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "请输入这个选项名或者删除这个选项！",
                        }],
                    })(
                        <Input placeholder="请输入选项内容" style={{ width: '95%', marginRight: 8 }} />
                    )}
                    {keys.length == k+1 && k? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => this.remove(k)}
                        />
                    ) : null}
                </FormItem>
            );
        });
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间！' }],
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
                    })(
                        <Input placeholder={"请输入标题"} />
                    )}
                </FormItem>
                {formItems}
                <FormItem {...tailFormItemLayout}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加选项
                    </Button>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="是否私有："
                >
                    {getFieldDecorator('private', {valuePropName:'checked',initialValue:true})(
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
                        initialValue:""
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
                    {getFieldDecorator('anonymous', {valuePropName:'checked',initialValue:true})(
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
export const UserPublishVote = Form.create()(UserPublishVoteForm);
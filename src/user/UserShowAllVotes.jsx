import * as React from "react";
import {Table, Divider, Row, Col, Form, Modal, Input} from "antd";
import {NavLink} from "react-router-dom";
import Search from "antd/lib/input/Search";
import {get, post} from '../utils/request';
import { api } from '../configs';
const FormItem = Form.Item;


const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="此投票私有，请输入投票密码："
                    okText="提交"
                    cancelText={"取消"}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="密码">
                            {getFieldDecorator('password')(
                                <Input type={"password"}/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

export class UserShowAllVotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            password: '',
            id:0
        };
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields(async (err, values) => {
            if (err) {
                return;
            }
            console.log(values)
            const votedata = await post(`${api.base}/vote/${this.state.id}`, values);

            if(votedata.status === 'ok') {
                this.props.history.push({
                    pathname: '/user/voting',
                    state:{
                        voteId: this.state.id,
                        data: votedata.data.vote
                    }
                })
            }
            else {
                alert(votedata.message);
            }
        });
    };
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    voting = async (voteId,isPrivate,user)=> {
        this.setState({id:voteId});
        if(isPrivate && user !== window.__user.id){
            this.showModal();
        }
        else {
            const data = await get(`${api.base}/vote/${voteId}`);

            this.props.history.push({
                pathname: '/user/voting',
                state:{
                    voteId: voteId,
                    data: data.data.vote
                }
            })
        }
    };

    async componentDidMount() {
        const data = await get(`${api.base}/votes`);
        data.status === 'ok' && this.setState({
            data: data.data.votes,
        });
    }

    async searchFunction(value) {
        const data = await get(`${api.base}/votes?title=${value}`);
        data.status === 'ok' && this.setState({
            data: data.data.votes,
        });
    }

    render() {

        const columns = [{
            title: '所有投票',
            dataIndex: 'title',
            key: 'title',
        },               {
            title: '操作',
            key: 'action',
            render: (record) => (
                <span>

        <a onClick={this.voting.bind(this,record.id,record.isPrivate,record.user)}>投票</a>
        <Divider type="vertical" />
        <NavLink to={{
            pathname:'/user/showDetailInfo',
            state:{
                voteId:record.id
            }
        }}>查看结果</NavLink>
    </span>
            ),
        }];

        return (
            <div className={"padding-top"}>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Row >
                    <Col offset={6} span={12}><Search
                        placeholder="请输入您要搜索的投票名称"
                        onSearch={value => this.searchFunction(value)}
                        enterButton
                    /></Col>
                </Row>
                <Row style={{paddingTop:"2em"}}>
                    <Col offset={6} span={12}><Table  dataSource={this.state.data}  columns={columns} rowKey={"id"}/></Col>
                </Row>
            </div>
        )
    }
}
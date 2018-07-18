import { Component } from 'react'
import { Modal, Form, Input, Radio } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    (props)=>{
        const { visible, onCancel, onCreate, form, data} = props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          };

        return (
            <Modal visible={visible} title="修改节点" onCancel={onCancel} onOk={onCreate}>
                <Form>
                    <FormItem label="父节点" {...formItemLayout}>
                        {getFieldDecorator('pid', {
                            initialValue: data.pid
                        })(
                        <Input disabled/>
                        )}
                    </FormItem>
                    <FormItem label="节点名称" {...formItemLayout}>
                        {getFieldDecorator('display_name', {
                            initialValue: data.display_name,
                            rules: [{ required: true, message: '请填写节点名称' }],
                        })(
                        <Input />
                        )}
                    </FormItem>
                    <FormItem label="节点key" {...formItemLayout}>
                        {getFieldDecorator('name', {
                            initialValue: data.name,
                            rules: [{ required: true, message: '请填写节点key' }],
                        })(
                        <Input />
                        )}
                    </FormItem>
                    <FormItem label="是否显示" {...formItemLayout}>
                        {getFieldDecorator('show', {
                            initialValue: data.show,
                            rules: [{ required: true, message: '请填写选择状态' }],
                        })(
                        <Radio.Group>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                          </Radio.Group>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)

class AuthModal extends Component{
    constructor(props){
        super();
        
    }

    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          values.id = this.props.id;
          this.props.onSubmit(values);
          form.resetFields();

        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    render(){
        const { visible, pid, display_name, name, show} = this.props;

        const data = {
            pid, 
            display_name,
            name,
            show
        }
        return (
            <CollectionCreateForm ref={this.saveFormRef} 
                                visible={visible}
                                data={data} 
                                onCancel={this.props.onClose} 
                                onCreate={this.handleCreate}>
            </CollectionCreateForm>
        )
    }
}

let mapToState = (state) =>{
    return {
        visible: state.authority.auth.modal_visible,
        id: state.authority.auth.id,
        pid: state.authority.auth.pid,
        display_name: state.authority.auth.display_name,
        name: state.authority.auth.name,
        show: state.authority.auth.show
    }
}

let mapToDispatch = (dispatch) => {
    return {
        onClose: ()=>{
            dispatch({type: 'authority/close_auth_modal'});
        },
        onSubmit: (data)=>{
            dispatch({type: 'authority/modifyAuth', data});
        }
    }
}

export default connect(mapToState, mapToDispatch)(AuthModal);
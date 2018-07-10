import React, { Component } from 'react'
import styles from './UserModal.less'
import { Modal } from 'antd'


class UserModal extends Component{
    constructor(props){
        super();
        this.state = {
            uid: ''
        }
    }

    render(){
        return (
            <Modal title="用户面板" visible={this.props.visible}>
                <p>内容内容</p>
            </Modal>
        )
    }
}

export default UserModal;
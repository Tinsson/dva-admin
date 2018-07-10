import React, { Component } from 'react';
import styles from '../../assets/css/Login.css';
import { Input, Button, Icon, Checkbox, message } from 'antd';
import PropTypes from 'prop-types'


class LoginCenter extends Component{
    static propTypes = {
        onSubLogin: PropTypes.func
    }

    constructor(props){
        super();
        this.state = {
            admin_name: '',
            admin_password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleadmin_name(e){
        this.setState({
            admin_name: e.target.value
        })
    }

    handlePsw(e){
        this.setState({
            admin_password: e.target.value
        })
    }

    handleSubmit(){
        if(this.state.admin_name === ''){
            message.error('账号不能为空!');
        }else if(this.state.admin_password === ''){
            message.error('密码不能为空!');
        }else{
            this.props.onSubLogin(this.state);
        }
    }
    
    render(){
        let { admin_name, admin_password } = this.state;

        return (
            <div className={styles.centerArea}>
                <h2 className={styles.headText}>mini programmer backend</h2>
                <div className={styles.inputBox}>
                    <h2 className={styles.tips}>Login</h2>
                    <div className={styles.ipt}>
                        <Input  suffix={<Icon type="user" />} 
                                value={admin_name}
                                placeholder="Please enter the account" 
                                onChange={this.handleadmin_name.bind(this)}
                                onPressEnter={this.handleSubmit} />
                    </div>
                    <div className={styles.ipt}>
                        <Input  suffix={<Icon type="lock" />} 
                                type="password" 
                                value={admin_password}
                                placeholder="Please enter the password" 
                                onChange={this.handlePsw.bind(this)}
                                onPressEnter={this.handleSubmit} />
                    </div>
                    <div className={styles.other}>
                        <Checkbox>remember password</Checkbox>
                    </div>
                    <Button type="primary" 
                            style={{width: '100%'}}
                            onClick={this.handleSubmit}>login</Button>
                </div>
            </div>
        )
    }
}

export default LoginCenter;
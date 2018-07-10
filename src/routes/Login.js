import React from 'react'
import { connect } from 'dva';
import styles from '../assets/css/Login.css'
import LoginCenter from '../components/login/LoginCenter'

class Login extends React.Component{

    
    render(){
        return (
            <div className={styles.login}>
                <LoginCenter onSubLogin={this.props.handleLoginInfo}/>
            </div>
        )
    }
}

let mapToState = (state)=>{
    return {
        info: state.info,
        watch: state.frame.watchRefresh
    }
}

let mapToDispatch = (dispatch)=>{
    return {
        handleLoginInfo: (info)=>{
            dispatch({type: 'frame/login', info})
        }
    }
}

export default connect(mapToState, mapToDispatch)(Login);
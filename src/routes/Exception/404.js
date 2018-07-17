import React, { Component } from 'react'
import styles from '../../assets/css/Exception.less'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { routerRedux } from 'dva/router'
import PropTypes from 'prop-types'


class Exception404 extends Component{
    static propTypes = {
        urls: PropTypes.array
    }

    render(){
        let urls = this.props.urls;

        return (
            <div className={styles.container}>
                404 not fund
                <div className={styles.linkText}>
                    <Link to={urls.length === 0?'/login':urls[0]}>返回首页</Link>
                </div>
            </div>
        )
    }
}

let mapToState = (state)=>{
    return {
        urls: state.frame.all_urls,
        token: state.frame.token
    }
}

let mapToDispatch = (dispatch)=>{
    return {
        onRouterLink: (path) =>{
            dispatch(routerRedux.push(path))
        }
    }
}

export default connect(mapToState, mapToDispatch)(Exception404);
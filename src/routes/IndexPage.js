import React, { Component } from 'react';
import { connect } from 'dva';
import { Redirect, routerRedux } from 'dva/router'


class IndexPage extends Component{
    
  render(){
    let path = this.props.token ? this.props.cur_path : '/login'
    console.log(path);
    return (
      <Redirect to={{pathname: path}} />
    )
  }
}

IndexPage.propTypes = {
};

let mapToState = (state)=>{
  return {
      urls: state.frame.all_urls,
      token: state.frame.token,
      cur_path: state.frame.cur_path
  }
}

let mapToDispatch = (dispatch)=>{
  return {
      onRouterLink: (path) =>{
          dispatch(routerRedux.push(path))
      }
  }
}

export default connect(mapToState, mapToDispatch)(IndexPage);

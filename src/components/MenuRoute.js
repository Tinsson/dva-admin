import React, { Component } from 'react'
import { Route, Redirect } from 'dva/router';
import MenuLayout from './MenuLayout';
import { connect } from 'dva'


class MenuRoute extends Component{

    constructor(props){
        super();
        props.onSetCurPath(props.path);
    }


    render(){
        let { component: Component, ...rest} = this.props;
        return (
            <Route {...rest} render={props=>{

                if(rest.all_urls.includes(rest.path)){
                    return (
                        <MenuLayout path={rest.path} menu={rest.menu}>
                            <Component {...props} />
                        </MenuLayout>
                    )
                }else{
                    return (
                        <Redirect to="/404"/>
                    )
                }
            }} />
        )
    }
}

let mapToState = (state)=>{
    return {
        menu: state.frame.menu,
        all_urls: state.frame.all_urls
    }
}

let mapToDispatch = (dispatch) => {
    return {
        onSetCurPath: (path)=>{
            console.log(path);
            dispatch({type: 'frame/set_cur', path})
        }
    }
}

export default connect(mapToState, mapToDispatch)(MenuRoute);


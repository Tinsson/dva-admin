import { Route, Redirect } from 'dva/router';
import authLogin from '../utils/authority';

export default function AuthRouter({ component: Component, ...rest}){
    return (
        <Route {...rest} render={props=>(
            authLogin() ? (<Component {...props} />) : 
            ( <Redirect to={{pathname: '/login', state: {from: props.location }}} /> )
        )} />
    )
}
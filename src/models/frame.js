 import {LoginApi} from '../services/frame'
 import { setAuth, removeAuth } from '../utils/authority'
 import authLogin from '../utils/authority'
 import { routerRedux } from 'dva/router'

export default {

    namespace: 'frame',
  
    state: {
        beforePath: '',
        cur_path: '/',
        menu: [],
        all_urls: [],
        token: ''
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        let auth = authLogin();
        if(auth){
          let menu = JSON.parse(auth.menu);
          dispatch({type: 'set_menu', menu});
          dispatch({type: 'set_token', token: JSON.parse(auth.token)})
          dispatch({type: 'set_cur_model', path: localStorage.getItem('cur_path')})
        }
        //判断登录之前的地址
        // history.listen(location => {
        //   if(location.state && location.pathname === '/login'){
        //     dispatch({type: 'set_before', path: location.state.from.pathname})
        //   }
        // })
        
      }
    },
  
    effects: {
      *login({ info }, { select, call, put }) {  // eslint-disable-line
        const res = yield call(LoginApi, info);

        if(res.status === 1){
          //设置登录状态
          setAuth(res.data);
          yield put({type: 'set_token', token: res.data.token});
          yield put({type: 'set_menu', menu: res.data.menu});
          
          yield put(routerRedux.push(res.data.menu[0].path + res.data.menu[0].children[0].path));
          // const beforePath = yield select(state => state.frame.beforePath);
          // if(beforePath){
          //   yield put(routerRedux.push(beforePath));
          // }else{
            
          // }
        }

      },
      *logout({info}, { call, put}){
        yield put({type: 'clear_menu'});
        yield call(removeAuth);
        yield put(routerRedux.push('/login'));
      },
      *set_cur({path}, {call, put}){
        yield call(()=>{localStorage.setItem('cur_path', path)});
        yield put({type: 'set_cur_model', path});
      }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
      set_cur_model(state, action){
        return {
          ...state,
          cur_path: action.path
        }
      },
      set_before(state, action){
        return { ...state, beforePath: action.path}
      },
      set_token(state, {token}){
        return { ...state, token}
      },
      set_menu(state, action){
        let all_urls = [];
        action.menu.forEach(val=>{
          val.children.forEach(vval=>{
            all_urls.push(val.path+vval.path);
          })
        })

        return {
          ...state,
          menu: action.menu,
          all_urls
        }
      },
      clear_menu(state){
        return {
          ...state,
          menu: [],
          all_urls: [],
          token: ''
        }
      }
    },
  
  };
import { PermissionList, PermissionEdit, AdminList } from '../services/authority'
import { message } from 'antd'

export default {

    namespace: 'authority',
  
    state: {
        auth: {
            permission: [],
            modal_visible: false,
            id: '',
            pid: '',
            display_name: '',
            name: '',
            show: ''
        },
        admin: {
            list: []
        }
    },
  
    effects: {
      *permissionFetch({ data }, { call, put }) {  // eslint-disable-line
        const res = yield call(PermissionList, data);
        yield put({type: 'save_auth', payload: {permission: res.data.permission}});
      },
      *modifyAuth({data}, {call, put}){
        const res = yield call(PermissionEdit, data);
        message.success(res.message);
        yield put({type: 'permissionFetch'});
        yield put({type: 'close_auth_modal'});
      },
      *adminFetch({data}, {call, put}){
        const res = yield call(AdminList);
        yield put({type: 'set_admin', list: res.data.list})
      }
    },
  
    reducers: {
      save_auth(state, action) {
        return { ...state, 
            auth: {
                ...state.auth,
                ...action.payload
            }
        };
      },
      open_auth_modal(state, action){
          return {
              ...state,
              auth: {
                  ...state.auth,
                  modal_visible: true,
                  ...action.modal
              }
          }
      },
      close_auth_modal(state){
        return {
            ...state,
            auth: {
                ...state.auth,
                modal_visible: false
            }
        }
      },
      set_admin(state, action){
        return {
            ...state,
            admin: {
                list: action.list
            }
        }
      }
    },
  
  };
  
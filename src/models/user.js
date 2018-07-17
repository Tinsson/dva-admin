import { UserList, ClassList } from '../services/user';

export default {

    namespace: 'user',
  
    state: {
        userData: [], //用户列表
        total: 0, 
        loading: false,
        classList: [], //课程列表
        total_class: 0,
        loading_class: false
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        
      },
    },
  
    effects: {
      *init({ data }, { call, put }) {  // eslint-disable-line
        yield put({type: 'set_loading', loading: true})
        const res = yield call(UserList, data);
        yield put({type: 'save', payload: {userData: res.data.list, total: res.data.total, loading: false}})
      },
      *init_class({data}, {call, put}){
        yield put({type: 'set_loading_class', loading: true})
        const res = yield call(ClassList, data);
        yield put({type: 'save_class', payload: {classList: res.data.lists, total_class: res.data.total, loading_class: false}})
      }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
      set_loading(state, {loading}){
        return { ...state, loading };
      },
      save_class(state, action){
        return {
          ...state, 
          ...action.payload
        }
      },
      set_loading_class(state, {loading}){
        return { ...state, loading };
      }
    },
  
  };
  
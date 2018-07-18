import { UserList, ClassList,ConsultList } from '../services/user';

export default {

    namespace: 'user',
  
    state: {
        userData: [], //用户列表
        total: 0, 
        loading: false,
        classList: [], //课程列表
        total_class: 0,
        loading_class: false,
        consultData: [], //咨询列表
        total_consult: 0,
        loading_consult: false
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
        yield put({type: 'save', payload: {classList: res.data.lists, total_class: res.data.total, loading_class: false}})
      },
      *init_consult({data}, {call, put}){
        yield put({type: 'set_loading_consult', loading: true})
        const res = yield call(ConsultList, data);
        yield put({type: 'save', payload: {consultData: res.data.list, total_consult: res.data.total, loading_consult: false}})
      }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
      set_loading(state, {loading}){
        return { ...state, loading };
      },
      set_loading_class(state, {loading}){
        return { ...state, loading_class: loading };
      },
      set_loading_consult(state, {loading}){
        return { ...state, loading_consult: loading };
      }
    },
  
  };
  
import { UserList } from '../services/user';

export default {

    namespace: 'user',
  
    state: {
        userData: [], //用户列表
        total: 0, 
        loading: false
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
      }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
      set_loading(state, {loading}){
        return { ...state, loading };
      }
    },
  
  };
  
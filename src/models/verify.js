import { EduList, VerifyEdu } from '../services/verify'
import { message } from 'antd'

export default {

    namespace: 'verify',
  
    state: {
        edu: {
          data: [],
          total: 0
        },
        loading: false
    },

  
    effects: {
      *init({ data }, { call, put }) {  // eslint-disable-line
        yield put({type: 'loading', loading: true})
        const res = yield call(EduList, data);
        yield put({ type: 'save' , payload: {edu: {data: res.data.list, total: res.data.total}, loading: false}});
      },
      *verify({data, listParams}, {call, put}){
        const res = yield call(VerifyEdu, data);
        message.success(res.message);
        yield put({type: 'init', data: listParams})
      }
    },
  
    reducers: {
      loading(state, action){
        return {
          ...state, 
          loading: action.loading
        }
      },
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
import { TutorPanel, LearnPanel } from '../services/user'

export default {

    namespace: 'global',
  
    state: {
        usermodal: {
            loading: false,
            visible: false,
            role: '',
            id: '',
            modalData: {}
        }
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *checkUser({ payload, fn }, { call, put }) {  // eslint-disable-line
        yield put({type: 'spin_start'});
        let res;
        if(payload.role === 1){
            res = yield call(LearnPanel, {uid: payload.id})
        }else if(payload.role === 2){
            res = yield call(TutorPanel, {uid: payload.id})
        }

        yield put({ type: 'open_user_modal', info: {
            usermodal: {
                loading: false,
                visible: true,
                role: payload.role,
                id: payload.id,
                modalData: res.data.list
            }
        }});
        
        if(fn){
            fn();
        }
      },
    },
  
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        spin_start(state){
            return { ...state, 
                usermodal: {
                    ...state.usermodal,
                    loading: true
                }
            }
        },
        close_user_modal(state){
            return { ...state, 
                usermodal: {
                    ...state.usermodal,
                    visible: false
                }
            }
        },
        open_user_modal(state, action){
            return {
                ...state,
                ...action.info
            }
        }
    },
  
};
  
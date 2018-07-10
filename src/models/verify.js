
export default {

    namespace: 'verify',
  
    state: {
        list: []
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *init({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
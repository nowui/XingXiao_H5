export default {

  namespace: 'send',

  state: {
    member_withdraw_amount: 0,
    member_commission_amount: 0,
    list: []
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.data };
    },
  },

};

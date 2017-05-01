export default {

  namespace: 'category',

  state: {
    list: []
  },

  reducers: {
    fetch(state, action) {
      return {...state, ...action.data};
    }
  }

};

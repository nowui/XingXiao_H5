export default {

  namespace: 'product',

  state: {
    model: {
      product_image: [],
      product_image_list: [],
      product_price: [],
      product_stock: 0,
      product_content: ''
    }
  },

  reducers: {
    fetch(state, action) {
      return {...state, ...action.data};
    }
  }

};

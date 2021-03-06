import constant from '../util/constant';

const open_id_key = ('open_id_' + constant.version);
const token_key = ('token_' + constant.version);
const product_key = ('product_' + constant.version);
const cart_key = ('cart_' + constant.version);
const delivery_key = ('delivery_' + constant.version);

function getOpenId() {
  return localStorage.getItem(open_id_key);
}

function setOpenId(open_id) {
  localStorage.setItem(open_id_key, open_id);
}


function getToken() {
  var token = localStorage.getItem(token_key);

  if (token == null) {
    if (constant.is_developer) {
      return 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0OTU0Mjg4ODEsImV4cCI6MTUyNjk2NDg4MSwiYXV0aG9yaXphdGlvbl9pZCI6IjFhZTczMWFjZDE3MzRkMTFhZTI1M2VjNzJhYWVhY2YwIiwidXNlcl9pZCI6IjQwZDRmYTZlNGE3MzRkMzM4NjIzMzY2ZTQzNDViNzg0In0.KfE3zG-W4DCRSanwlMoMvF_d6jUcpCSIDbedPCa_QBVy3JY026GUFYMFtk_9GHlGqZA9-8k2kfR6RojfK_NTrQ';
    } else {
      return '';
    }
  }

  return token;
}

function setToken(token) {
  localStorage.clear();

  localStorage.setItem(token_key, token);
}

function getProduct() {
  var product = localStorage.getItem(product_key);

  if (product == null) {
    return [];
  }

  return JSON.parse(product);
}

function setProduct(product) {
  localStorage.setItem(product_key, JSON.stringify(product));
}

function removeProduct() {
  localStorage.removeItem(product_key);
}

function getCart() {
  var cart = localStorage.getItem(cart_key);

  if (cart == null) {
    return [];
  }

  return JSON.parse(cart);
}

function setCart(cart) {
  localStorage.setItem(cart_key, JSON.stringify(cart));
}

function addCart(product) {
  var cartList = getCart();
  var isNotExit = true;

  for (var i = 0; i < cartList.length; i++) {
    var cart = cartList[i];

    if (cart.product_id == product.product_id) {
      isNotExit = false;

      cart.sku_id = product.sku_id;
      cart.product_name = product.product_name;
      cart.product_image = product.product_image;
      cart.product_price = product.product_price;
      cart.product_quantity.quantity = product.product_quantity.quantity + cart.product_quantity.quantity;
      cart.product_stock = product.product_stock;
    }
  }

  if (isNotExit) {
    cartList.push(product);
  }

  localStorage.setItem(cart_key, JSON.stringify(cartList));
}

function removeCart() {
  localStorage.removeItem(cart_key);
}

function getDelivery() {
  var delivery = localStorage.getItem(delivery_key);

  if (delivery == null) {
    return {
      delivery_name: '',
      delivery_phone: '',
      delivery_address: ''
    };
  }

  return JSON.parse(delivery);
}

function setDelivery(delivery) {
  localStorage.setItem(delivery_key, JSON.stringify(delivery));
}

function removeDelivery() {
  localStorage.removeItem(delivery_key);
}

module.exports = {
  getOpenId: getOpenId,
  setOpenId: setOpenId,
  getToken: getToken,
  setToken: setToken,
  getProduct: getProduct,
  setProduct: setProduct,
  removeProduct: removeProduct,
  getCart: getCart,
  setCart: setCart,
  addCart: addCart,
  removeCart: removeCart,
  getDelivery: getDelivery,
  setDelivery: setDelivery,
  removeDelivery: removeDelivery
};

import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';

import Auth from './view/Auth';
import Main from './view/Main';
import Home from './view/Home';
import Cart from './view/Cart';
import Mine from './view/Mine';
import Login from './view/Login';
import Register from './view/Register';
import Product from './view/Product';
import OrderIndex from './view/OrderIndex';
import OrderDetail from './view/OrderDetail';
import OrderCheck from './view/OrderCheck';
import OrderResult from './view/OrderResult';
import DeliveryIndex from './view/DeliveryIndex';
import DeliveryDetail from './view/DeliveryDetail';
import FavorIndex from './view/FavorIndex';
import TeamIndex from './view/TeamIndex';
import Knowledge from './view/Knowledge';
import Qrcode from './view/Qrcode';

export default function ({history}) {

  const handleEnter = function (next, replace, callback) {


    callback();
  };

  const handleChange = function (next, replace, callback) {


    callback();
  };

  return (
    <Router history={history}>
      <Route path="/" onEnter={handleEnter} onChange={handleChange}>
        <IndexRedirect to="home"/>
        <Route path="auth/:wechat_open_id" component={Auth}/>
        <Route path="login" component={Login}/>
        <Route path="register" component={Register}/>
        <Route component={Main}>
          <Route path="home" component={Home}/>
          <Route path="product" component={Product}/>
          <Route path="knowledge" component={Knowledge}/>
          <Route path="mine" component={Mine}/>
        </Route>
        <Route path="cart" component={Cart}/>
        <Route path='order/index/:order_flow' component={OrderIndex}/>
        <Route path='order/detail/:order_flow/:order_id' component={OrderDetail}/>
        <Route path="order/check/:type" component={OrderCheck}/>
        <Route path="order/result/:type/:order_id" component={OrderResult}/>
        <Route path="delivery/index/:type" component={DeliveryIndex}/>
        <Route path="delivery/add/:type" component={DeliveryDetail}/>
        <Route path="delivery/edit/:type/:delivery_id" component={DeliveryDetail}/>
        <Route path="favor/index" component={FavorIndex}/>
        <Route path="team/index" component={TeamIndex}/>
        <Route path="qrcode" component={Qrcode}/>
      </Route>
    </Router>
  );
};

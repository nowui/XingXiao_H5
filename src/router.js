import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';

import Main from './view/Main';
import Home from './view/Home';
import Index from './view/Index';
import Category from './view/Category';
import My from './view/My';
import Product from './view/Product';
import Article from './view/Article';
import ProductDetail from './view/ProductDetail';
import OrderIndex from './view/OrderIndex';
import OrderDetail from './view/OrderDetail';
import OrderCheck from './view/OrderCheck';
import OrderResult from './view/OrderResult';
import DeliveryIndex from './view/DeliveryIndex';
import DeliveryDetail from './view/DeliveryDetail';
import FavorIndex from './view/FavorIndex';
import TeamDetail from './view/TeamDetail';
import TeamLevel from './view/TeamLevel';
import BillIndex from './view/BillIndex';
import BillMemberIndex from './view/BillMemberIndex';
import Qrcode from './view/Qrcode';
import SendIndex from './view/SendIndex';

import wechat from './util/wechat';

export default function ({ history }) {
  const handleEnter = function (next, replace, callback) {
    wechat.auth();

    callback();
  };

  const handleChange = function (next, replace, callback) {
    callback();
  };

  return (
    <Router history={history}>
      <Route path="/" onEnter={handleEnter} onChange={handleChange}>
        <IndexRedirect to="home" />
        <Route path="home" component={Home} />
        <Route component={Main}>
          <Route path="index" component={Index} />
          <Route path="product" component={Product} />
          <Route path="article" component={Article} />
          <Route path="my" component={My} />
        </Route>
        <Route path="category/:category_id" component={Category} />
        <Route path="product/detail/:type/:product_id" component={ProductDetail} />
        <Route path="order/index/:order_flow" component={OrderIndex} />
        <Route path="order/detail/:order_flow/:order_id" component={OrderDetail} />
        <Route path="order/check/:type" component={OrderCheck} />
        <Route path="order/result/:type/:order_id" component={OrderResult} />
        <Route path="delivery/index/:type" component={DeliveryIndex} />
        <Route path="delivery/add/:type" component={DeliveryDetail} />
        <Route path="delivery/edit/:type/:delivery_id" component={DeliveryDetail} />
        <Route path="favor/index" component={FavorIndex} />
        <Route path="team/detail/:member_id" component={TeamDetail} />
        <Route path="team/level/:member_id" component={TeamLevel} />
        <Route path="bill/index" component={BillIndex} />
        <Route path="bill/member/index/:member_id" component={BillMemberIndex} />
        <Route path="qrcode" component={Qrcode} />
        <Route path="send/index" component={SendIndex} />
      </Route>
    </Router>
  );
}

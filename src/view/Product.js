import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {List, WhiteSpace, Stepper} from 'antd-mobile';

import constant from '../util/constant';
import storage from '../util/storage';
import http from '../util/http';

import style from './style.css';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'main/fetch',
      data: {
        title: '我要进货'
      },
    });

    document.body.scrollTop = 0;

    this.handleLoad();
  }

  componentWillUnmount() {

  }

  handleLoad() {
    http.request({
      url: '/xingxiao/product/find',
      data: {
        product_id: '0551169341324bd2a72d77ff84857922',
      },
      success: function (data) {
        var product_quantity_min = data.product_quantity_min;
        var product_price = JSON.parse(data.sku_list[0].product_price);
        var product_total = 0;

        var price = product_price[0].product_price == 12 ? 14 : product_price[0].product_price;
        var quantity = product_quantity_min >= 25000 ? (product_quantity_min - 15000) : product_quantity_min;

        // product_total = product_price[0].product_price * product_quantity_min;
        product_total = price * quantity;

        this.props.dispatch({
          type: 'product/fetch',
          data: {
            is_load: true,
            product_quantity: product_quantity_min,
            product_quantity_min: product_quantity_min,
            product_total: product_total,
            product_id: data.product_id,
            product_name: data.product_name,
            product_image_file: data.product_image_file,
            product_image_file_list: data.product_image_file_list,
            product_price: product_price,
            product_stock: data.sku_list[0].product_stock,
            sku_id: data.sku_list[0].sku_id,
            product_content: data.product_content
          },
        });
      }.bind(this),
      complete() {

      },
    });
  }

  handleChange(product_quantity) {
    var product_total = 0;

    product_total = this.props.product.product_price[0].product_price * product_quantity;

    this.props.dispatch({
      type: 'product/fetch',
      data: {
        product_quantity: product_quantity,
        product_total: product_total
      },
    });
  }

  handleBuy() {
    storage.setProduct([{
      product_id: this.props.product.product_id,
      product_name: this.props.product.product_name,
      product_image_file: this.props.product.product_image_file,
      product_price: this.props.product.product_price,
      product_quantity: this.props.product.product_quantity,
      sku_id: this.props.product.sku_id,
    }]);

    this.props.dispatch(routerRedux.push({
      pathname: '/order/check/product',
      query: {}
    }));
  }

  render() {
    const Item = List.Item;

    return (
      <div>
        {/*<NavBar*/}
          {/*className={style.header} mode="light" iconName={false}*/}
        {/*>爆水丸</NavBar>*/}
        <div className={style.page3}>
          {
            this.props.product.is_load ?
              <img style={{
                width: document.documentElement.clientWidth + 'px',
                height: document.documentElement.clientWidth + 'px'
              }} src={constant.host + this.props.product.product_image_file}/>
              :
              ''
          }
          <List>
            <Item>
              {this.props.product.product_name}
              <br />
              {
                this.props.product.product_price.length > 0 ?
                  <span
                    className={style.productPopupRedText}
                  >￥{this.props.product.product_price[0].product_price == 12 ? new Number(14).toFixed(2) : this.props.product.product_price[0].product_price.toFixed(2)}</span>
                  :
                  ''
              }
            </Item>
          </List>
          <WhiteSpace size="lg"/>
          <List>
            <Item>
              已选：{this.props.product.product_quantity >= 25000 ? (this.props.product.product_quantity - 15000) : this.props.product.product_quantity} 个
            </Item>
            <Item extra={
              <Stepper
                style={{width: '100%', minWidth: '2rem'}}
                showNumber={false}
                max={99999}
                min={this.props.product.product_quantity_min}
                defaultValue={this.props.product.product_quantity}
                onChange={this.handleChange.bind(this)}
                useTouch={!window.isPC}
              />}
            >
              购买数量
            </Item>
            <div className={style.productPopupQuantity}>
              <div className={style.productPopupQuantityNumber}>{this.props.product.product_quantity >= 25000 ? (this.props.product.product_quantity - 15000) : this.props.product.product_quantity}</div>
            </div>
          </List>
          <WhiteSpace size="lg"/>
          <div
            className={style.productContent}
            dangerouslySetInnerHTML={{__html: this.props.product.product_content}}
          />
        </div>
        <div className={style.footer2}>
          <div className={style.checkTotal}>
            <span className={style.checkTotalText}>总金额: ￥{this.props.product.product_total.toFixed(2)}</span>
          </div>
          <div className={style.productBuy} onClick={this.handleBuy.bind(this)}>立即进货</div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {};

export default connect(({product}) => ({product}))(Product);

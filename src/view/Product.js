import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, List, Toast, WhiteSpace, Stepper } from 'antd-mobile';

import constant from '../util/constant';
import storage from '../util/storage';
import http from '../util/http';

import style from './style.css';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_cart: true,
      cart_count: storage.getCart().length,
      product_quantity: 1,
      product_total: 1,
      product: {
        product_image_file: '',
        product_image_file_list: [],
        product_price: [],
        product_stock: 0,
        sku_id: '',
      }
    };
  }

  componentDidMount() {
    this.handleLoad();
  }

  componentWillUnmount() {

  }

  handleLoad() {
    http({
      url: '/product/find',
      data: {
        product_id: '0551169341324bd2a72d77ff84857922',
      },
      success: function (data) {
        this.setState({
          product: {
            product_id: data.product_id,
            product_name: data.product_name,
            product_image_file: data.product_image_file,
            product_image_file_list: data.product_image_file_list,
            product_price: JSON.parse(data.sku_list[0].product_price),
            product_quantity: data.product_quantity,
            product_stock: data.sku_list[0].product_stock,
            sku_id: data.sku_list[0].sku_id,
            product_content: data.product_content,
          },
        });
      }.bind(this),
      complete() {

      },
    }).post();
  }

  handleSubmit() {
    if (this.state.is_cart) {
      storage.addCart({
        product_id: this.state.product.product_id,
        product_name: this.state.product.product_name,
        product_image_file: this.state.product.product_image_file,
        product_price: this.state.product.product_price,
        product_quantity: this.state.product_quantity,
        product_stock: this.state.product.product_stock,
        sku_id: this.state.product.sku_id,
      });

      this.setState({
        cart_count: storage.getCart().length
      });
    } else {
      storage.setProduct([{
        product_id: this.state.product.product_id,
        product_name: this.state.product.product_name,
        product_image_file: this.state.product.product_image_file,
        product_price: this.state.product.product_price,
        product_quantity: this.state.product_quantity,
        sku_id: this.state.product.sku_id,
      }]);

      setTimeout(() => {
        this.props.dispatch(routerRedux.push({
          pathname: '/order/check/product_' + this.props.params.product_id,
          query: {},
        }));
      }, 500);
    }
  }

  handleChange(product_quantity) {
    this.setState({
      product_quantity: product_quantity
    });
  }

  handleBuy() {

  }

  render() {
    const Item = List.Item;

    return (
      <div>
        <NavBar
          className={style.header} mode="light" iconName={false}
        >爆水丸</NavBar>
        <div className={style.page3}>
          <img style={{ width: `${document.documentElement.clientWidth}px`, height: `${document.documentElement.clientWidth}px` }} src={constant.host + this.state.product.product_image_file} />
          <List>
            <Item>
              {this.state.product.product_name}
              <br />
              {
                this.state.product.product_price.length > 0 ?
                  <span
                    className={style.productPopupRedText}
                  >￥{this.state.product.product_price[0].product_price.toFixed(2)}</span>
                  :
                  ''
              }
            </Item>
          </List>
          <WhiteSpace size="lg" />
          <List>
            <Item>
              已选：{this.state.product_quantity} 个
            </Item>
            <Item>
              <List.Item extra={
                <Stepper
                  style={{width: '100%', minWidth: '2rem'}}
                  showNumber={false}
                  max={this.props.product_stock}
                  min={1}
                  defaultValue={this.state.product_quantity}
                  onChange={this.handleChange.bind(this)}
                  useTouch={!window.isPC}
                />}
              >
                <div className={style.productPopupQuantity}>
                  <div className={style.productPopupQuantityNumber}>{this.state.product_quantity}</div>
                </div>
                购买数量
              </List.Item>
            </Item>
          </List>
          <WhiteSpace size="lg" />
          <div
            className={style.productContent}
            dangerouslySetInnerHTML={{ __html: this.state.product.product_content }}
          />
        </div>
        <div className={style.footer2}>
          <div className={style.checkTotal}>
            <span className={style.checkTotalText}>总金额: ￥{this.state.product_total}</span>
          </div>
          <div className={style.productBuy} onClick={this.handleBuy.bind(this)}>立即购买</div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {};

export default connect(({}) => ({}))(Product);

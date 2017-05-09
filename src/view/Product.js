import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Carousel, List, Toast, Badge, WhiteSpace, Stepper } from 'antd-mobile';

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
      product: {
        product_image_file: '',
        product_image_file_list: [],
        product_price: [],
        product_stock: 0,
        sku_id: '',
      },
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

  handleBack() {
    if (this.props.params.type == 'index') {
      this.props.dispatch(routerRedux.push({
        pathname: '/index',
        query: {},
      }));
    }

    if (this.props.params.type.indexOf('category_') > -1) {
      this.props.dispatch(routerRedux.push({
        pathname: this.props.params.type.replace('_', '/'),
        query: {},
      }));
    }
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
        cart_count: storage.getCart().length,
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

  handleGo() {
    this.props.dispatch(routerRedux.push({
      pathname: '/cart',
      query: {},
    }));
  }

  handleCart() {
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
      cart_count: storage.getCart().length,
    });

    Toast.success('加入成功', constant.duration);
  }

  handleIndex() {
    this.props.dispatch(routerRedux.push({
      pathname: '/index',
      query: {},
    }));
  }

  handleFavor() {
    Toast.success('收藏成功', constant.duration);
  }

  handleBuy() {
    storage.setProduct([{
      product_id: this.state.product.product_id,
      product_name: this.state.product.product_name,
      product_image_file: this.state.product.product_image_file,
      product_price: this.state.product.product_price,
      product_quantity: this.state.product_quantity,
      sku_id: this.state.product.sku_id,
    }]);

    this.props.dispatch(routerRedux.push({
      pathname: '/order/check/product_detail_' + this.props.params.type + '_' + this.props.params.product_id,
      query: {},
    }));
  }

  handleQuantity(product_quantity) {
    this.setState({
      product_quantity,
    });
  }

  render() {
    const Item = List.Item;

    return (
      <div>
        <NavBar
          className={style.header} mode="light" iconName={false}
        >爆水丸</NavBar>
        <div className={style.page}>
        </div>
      </div>
    );
  }
}

Product.propTypes = {};

export default connect(({}) => ({}))(Product);

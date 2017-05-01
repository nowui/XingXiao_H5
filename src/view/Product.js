import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {NavBar, Carousel, List, Toast, WhiteSpace, Stepper} from 'antd-mobile';

import constant from '../util/constant';
import database from '../util/database';
import http from '../util/http';

import style from './style.css';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_quantity: 1,
      total: 0
    }
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
        product_id: '8f4b22865182483488c794f3d92790cb'
      },
      success: function (data) {
        data.product_image_list = JSON.parse(data.product_image_list_original);
        data.product_image = JSON.parse(data.product_image_original);
        data.product_price = JSON.parse(data.sku_list[0].product_price);
        data.product_stock = data.sku_list[0].product_stock;
        data.sku_id = data.sku_list[0].sku_id;

        this.props.dispatch({
          type: 'product/fetch',
          data: {
            model: data
          }
        });

        let total = data.product_price[0].product_price * this.state.product_quantity;
        this.setState({
          total: total
        });
      }.bind(this),
      complete: function () {

      }.bind(this)
    }).post();
  }

  handleBack() {
    if (this.props.params.type == 'home') {
      this.props.dispatch(routerRedux.push({
        pathname: '/home',
        query: {}
      }));
    }

    if (this.props.params.type.indexOf('category_') > -1) {
      this.props.dispatch(routerRedux.push({
        pathname: this.props.params.type.replace('_', '/'),
        query: {}
      }));
    }
  }

  handleSubmit() {
    if (this.state.is_cart) {
      database.addCart({
        product_id: this.state.product.product_id,
        product_name: this.state.product.product_name,
        product_image: this.state.product.product_image[0],
        product_price: this.state.product.product_price,
        product_quantity: this.state.product_quantity,
        product_stock: this.state.product.product_stock,
        sku_id: this.state.product.sku_id
      });

      this.setState({
        cart_count: database.getCartList().length
      });
    } else {
      database.setProduct([{
        product_id: this.state.product.product_id,
        product_name: this.state.product.product_name,
        product_image: this.state.product.product_image[0],
        product_price: this.state.product.product_price,
        product_quantity: this.state.product_quantity,
        sku_id: this.state.product.sku_id
      }]);

      setTimeout(function () {
        this.props.dispatch(routerRedux.push({
          pathname: '/order/check/product_' + this.props.params.product_id,
          query: {}
        }));
      }.bind(this), 500);
    }
  }

  handleBuy() {
    database.setProduct([{
      product_id: this.props.product.model.product_id,
      product_name: this.props.product.model.product_name,
      product_image: this.props.product.model.product_image[0],
      product_price: this.props.product.model.product_price,
      product_quantity: this.state.product_quantity,
      sku_id: this.props.product.model.sku_id
    }]);

    this.props.dispatch(routerRedux.push({
      pathname: '/order/check/product',
      query: {}
    }));
  }

  handleQuantity(product_quantity) {
    let total = this.props.product.model.product_price[0].product_price * product_quantity;
    this.setState({
      product_quantity: product_quantity,
      total: total
    });
  }

  render() {
    const Item = List.Item;

    return (
      <div>
        <NavBar className={style.header} mode="light" iconName={false}
        >爆水丸</NavBar>
        <div className={style.page}>
          {
            this.props.product.model.product_image.length == 0 ?
              ''
              :
              <img style={{width: '100%'}} src={constant.host + this.props.product.model.product_image[0]}/>
          }
          <List>
            <Item>
              {
                this.props.product.model.product_price.length > 0 ?
                  <span
                    className={style.productPopupRedText}>￥{this.props.product.model.product_price[0].product_price.toFixed(2)}</span>
                  :
                  ''
              }
            </Item>
          </List>
          <WhiteSpace size="lg"/>
          <List>
            <Item>
              <Stepper
                style={{width: '200px', minWidth: '2rem'}}
                showNumber={true}
                max={99999}
                min={1}
                defaultValue={this.state.product_quantity}
                onChange={this.handleQuantity.bind(this)}
                useTouch={!window.isPC}
              />
            </Item>
          </List>
          <WhiteSpace size="lg"/>
          <div className={style.productContent}
               dangerouslySetInnerHTML={{__html: this.props.product.model.product_content}}></div>
          <WhiteSpace size="lg"/>
          <WhiteSpace size="lg"/>
          <WhiteSpace size="lg"/>
        </div>
        <div className={style.footer2}>
          <div className={style.checkTotal}>
            <div className={style.checkTotalText}>合计: ￥{this.state.total.toFixed(2)}</div>
          </div>
          <div className={style.productBuy} onClick={this.handleBuy.bind(this)}>立即购买</div>
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {};

export default connect(({product}) => ({product}))(ProductDetail);

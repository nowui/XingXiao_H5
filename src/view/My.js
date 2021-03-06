import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {WhiteSpace, List, Badge} from 'antd-mobile';

import http from '../util/http';

import style from './style.css';

class My extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_load: false
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'main/fetch',
      data: {
        title: '个人中心'
      },
    });

    document.body.scrollTop = 0;

    this.handleLoad();
  }

  componentWillUnmount() {

  }

  handleLoad() {
    http.request({
      url: '/member/my/find',
      data: {},
      success: function (data) {
        this.props.dispatch({
          type: 'my/fetch',
          data: data
        });

        this.setState({
          is_load: true
        });
      }.bind(this),
      complete() {

      },
    });
  }

  handleBill() {
    this.props.dispatch(routerRedux.push({
      pathname: '/bill/index',
      query: {}
    }));
  }

  handleOrder(order_status) {
    this.props.dispatch(routerRedux.push({
      pathname: '/order/index/' + order_status,
      query: {}
    }));
  }

  handleSend() {
    this.props.dispatch(routerRedux.push({
      pathname: '/send/index',
      query: {}
    }));
  }

  handleDelivery() {
    this.props.dispatch(routerRedux.push({
      pathname: '/delivery/index/list',
      query: {}
    }));
  }

  handleFavor() {
    this.props.dispatch(routerRedux.push({
      pathname: '/favor/index',
      query: {}
    }));
  }

  handleQrcode() {
    this.props.dispatch(routerRedux.push({
      pathname: '/qrcode',
      query: {}
    }));
  }

  handleTeam() {
    this.props.dispatch(routerRedux.push({
      pathname: '/team/index',
      query: {}
    }));
  }

  render() {
    const Item = List.Item;

    var content = '';

    if (this.state.is_load) {
      if (this.props.my.member_status) {
        content = <div className={style.teamMoney}>
          <div>收入：￥{this.props.my.member_commission_amount}</div>
          <div>进货：￥{this.props.my.member_order_amount}</div>
        </div>
      } else {
        content = '待审核';
      }
    }

    return (
      <div>
        {/*<NavBar className={style.header} mode="light" iconName={false}>个人中心</NavBar>*/}
        <div className={style.page2}>
          <WhiteSpace size="lg"/>
          <List>
            <Item
              onClick={this.handleBill.bind(this)}
              extra={content}
              arrow="horizontal"
            >
              <div className={style.avatar}>
                <img src={this.props.my.user_avatar} style={{width: '100%', height: '100%'}}/>
              </div>
              <div className={style.name}>{this.props.my.user_name}</div>
              <div className={style.totalAmount}>
                {this.props.my.member_level_name}
              </div>
            </Item>
          </List>
          <WhiteSpace size="lg"/>
          <List>
            <Item
              thumb={require('../assets/svg/form.svg')}
              extra="查看全部" arrow="horizontal"
              onClick={this.handleOrder.bind(this, 'ALL')}
            >
              我的订单
            </Item>
            <Item style={{paddingLeft: '60px'}}>
              <div className={style.mineOrderItem} onClick={this.handleOrder.bind(this, 'WAIT_PAY')}>
                <Badge text={this.props.my.member_wait_pay}>
                  <img src={require('../assets/svg/pay.svg')}/>
                </Badge>
                <div className={style.mineOrderItemText}>待付款</div>
              </div>
              <div className={style.mineOrderItem} onClick={this.handleOrder.bind(this, 'WAIT_SEND')}>
                <Badge text={this.props.my.member_wait_send}>
                  <img src={require('../assets/svg/send.svg')}/>
                </Badge>
                <div className={style.mineOrderItemText}>待发货</div>
              </div>
              <div className={style.mineOrderItem} onClick={this.handleOrder.bind(this, 'WAIT_RECEIVE')}>
                <Badge text={this.props.my.member_wait_receive}>
                  <img src={require('../assets/svg/deliver.svg')}/>
                </Badge>
                <div className={style.mineOrderItemText}>待收货</div>
              </div>
              <div className={style.mineOrderItem} onClick={this.handleOrder.bind(this, 'FINISH')}>
                <img src={require('../assets/svg/comment.svg')}/>
                <div className={style.mineOrderItemText}>已完成</div>
              </div>
            </Item>
          </List>
          <WhiteSpace size="lg"/>
          <List>
            <Item
              thumb={require('../assets/svg/vip.svg')} arrow="horizontal"
              onClick={this.handleSend.bind(this)}
            >
              我的库存
            </Item>
            <Item
              thumb={require('../assets/svg/location.svg')} arrow="horizontal"
              onClick={this.handleDelivery.bind(this)}
            >
              我的地址
            </Item>
            {
              this.props.my.member_status ?
                <Item
                  thumb={require('../assets/svg/qr_code.svg')} arrow="horizontal"
                  onClick={this.handleQrcode.bind(this)}
                >
                  我的二维码
                </Item>
                :
                ''
            }
          </List>
        </div>
      </div>
    );
  }
}

My.propTypes = {};

export default connect(({my}) => ({my}))(My);

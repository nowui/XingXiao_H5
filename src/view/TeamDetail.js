import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Radio, Toast} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';
import style from './style.css';

class TeamDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_load: false,
      member_level_id: '',
      order_list: [],
      member_level_list: []
    };
  }

  componentDidMount() {
    document.body.scrollTop = 0;

    this.handleLoad();
  }

  componentWillUnmount() {

  }

  handleLoad() {
    http.request({
      url: '/member/team/find',
      data: {
        member_id: this.props.params.member_id
      },
      success: function (data) {
        this.setState(data);
      }.bind(this),
      complete: function () {
        this.setState({
          is_load: true
        });
      }.bind(this),
    });
  }

  handleChange(member_level_id) {
    this.setState({
      member_level_id: member_level_id
    });
  }


  handleBack() {
    this.props.dispatch(routerRedux.push({
      pathname: '/index',
      query: {}
    }));
  }

  handleClick(member_id) {
    this.props.dispatch(routerRedux.push({
      pathname: '/team/level/' + member_id,
      query: {}
    }));
  }

  handleOrderClick(order_id) {

  }

  handleSubmit() {
    if (this.state.member_level_id == '') {
      Toast.fail('请选择会员等级', constant.duration);

      return;
    }

    http.request({
      url: '/member/member/level/update',
      data: {
        member_id: this.state.member_id,
        member_level_id: this.state.member_level_id
      },
      success: function (data) {
        this.props.dispatch(routerRedux.push({
          pathname: '/index',
          query: {},
        }));
      }.bind(this),
      complete: function () {

      }.bind(this),
    });
  }

  render() {
    const Item = List.Item;
    const RadioItem = Radio.RadioItem;

    var content = '';

    if (this.state.is_load) {
      if (this.state.member_status) {
        content = <div className={style.teamMoney}>
          <div>当月进货：￥{this.state.member_month_order_amount}</div>
          <div>全部进货：￥{this.state.member_all_order_amount}</div>
        </div>
      } else {
        content = '待审核';
      }
    }

    return (
      <div>
        <NavBar
          className={style.header} mode="light" leftContent="返回"
          onLeftClick={this.handleBack.bind(this)}
        >我的团队</NavBar>
        <div className={style.page2}>
          <WhiteSpace size="lg"/>
          <List>
            <Item arrow={this.state.is_load && !this.state.member_status ? '' : 'horizontal'}
                  extra={content}
                  onClick={this.handleClick.bind(this, this.props.params.member_id)}
            >
              <div className={style.teamAvatar}>
                <img src={this.state.user_avatar} style={{width: '100%', height: '100%'}}/>
              </div>
              <div className={style.teamName}>{this.state.member_name}</div>
              <div className={style.teamLevel}>
                {this.state.member_level_name}
              </div>
            </Item>
          </List>
          {
            this.state.order_list.map((order) => {
              var order_status = '';
              var order_status_list = constant.order_status_list;
              for (var i = 0; i < order_status_list.length; i++) {
                if (order_status_list[i].order_status_value == order.order_flow) {
                  order_status = order_status_list[i].order_status_name;

                  break;
                }
              }

              return (
                <List style={{marginTop: '30px'}} key={order.order_id}
                      onClick={this.handleOrderClick.bind(this, order.order_id)}>
                  <Item extra={order_status}>
                    {order.order_number}
                  </Item>
                  {
                    order.product_list.map((product) => {
                      return (
                        <Item
                          key={product.product_id}
                        >
                          <div className={style.avatar}>
                            <img src={constant.host + product.product_image_file}
                                 style={{width: '100%', height: '100%'}}/>
                          </div>
                          <div className={style.name}>{product.product_name}</div>
                          <div className={style.totalAmount}>
                            ￥{product.order_product_price} X {product.order_product_quantity}
                          </div>
                        </Item>
                      );
                    })
                  }
                  <Item>
                    <span style={{fontSize: '28px'}}>共{order.product_list.length}件商品，合计：￥{order.order_amount}</span>
                  </Item>
                </List>
              );
            })
          }
          {
            this.state.member_status ?
              ''
              :
              <List renderHeader={() => '选择会员等级'}>
                {
                  this.state.member_level_list.map((item) => {
                    return (
                      <RadioItem key={item.member_level_id}
                                 checked={item.member_level_id === this.state.member_level_id}
                                 onChange={this.handleChange.bind(this, item.member_level_id)}>
                        {item.member_level_name}
                      </RadioItem>
                    );
                  })
                }
              </List>
          }
          {
            this.state.is_load && !this.state.member_status ?
              <div className={style.footer}>
                <div className={style.buttonSubmit}
                     onClick={this.handleSubmit.bind(this)}
                >通过审核
                </div>
              </div>
              :
              ''
          }
        </div>
      </div>
    );
  }
}

TeamDetail.propTypes = {};

export default connect(({}) => ({}))(TeamDetail);

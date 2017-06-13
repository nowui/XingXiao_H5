import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {WhiteSpace} from 'antd-mobile';

import http from '../util/http';
import style from './style.css';

class SendIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_load: false,
      is_list: false,
      favor_id: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'main/fetch',
      data: {
        title: '我的库存'
      },
    });

    document.body.scrollTop = 0;

    // this.handleLoad();
  }

  componentWillUnmount() {

  }

  handleLoad() {
    http.request({
      url: '/favor/list',
      data: {
        page_index: 1,
        page_size: 10,
      },
      success: function (data) {
        this.props.dispatch({
          type: 'favor/fetch',
          data: {
            list: data,
          },
        });
      }.bind(this),
      complete: function () {
        this.setState({
          is_load: true,
        });
      }.bind(this),
    });
  }

  handleBack() {
    this.props.dispatch(routerRedux.push({
      pathname: '/my',
      query: {},
    }));
  }

  handleMoney() {

  }

  render() {
    return (
      <div>
        <div className={style.header2} style={{backgroundColor: '#ffffff'}}>
          <div style={{margin: '30px 0px 30px 0px'}}>
            <div style={{float: 'left', width: '49%'}}>
              <div style={{marginLeft: '20px'}}>
                <div>剩余库存</div>
                <div>{this.props.send.member_withdraw_amount}</div>
              </div>
            </div>
            <div style={{float: 'left', width: '49%', borderLeft: '1px solid #ddd'}}>
              <div style={{marginLeft: '20px'}}>
                <div>总共入库</div>
                <div>{this.props.send.member_commission_amount}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.page4}>
          <WhiteSpace size="lg"/>
          <view className={style.noData}>
            <img src={require('../assets/svg/empty.svg')} className={style.noDataImageIcon}></img>
            <view className={style.noDataText}>当前没有数据</view>
          </view>
        </div>
        <div className={style.footer}>
          <div className={style.footerButtom} onClick={this.handleMoney.bind(this)}>我要发货</div>
        </div>
      </div>
    );
  }
}

SendIndex.propTypes = {};

export default connect(({send}) => ({send}))(SendIndex);

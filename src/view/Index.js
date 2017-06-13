import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {WhiteSpace, List} from 'antd-mobile';

import http from '../util/http';

import style from './style.css';

class Index extends Component {
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
        title: '我的团队'
      },
    });

    document.body.scrollTop = this.props.index.scroll_top;

    this.handleLoad();
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'index/fetch',
      data: {
        scroll_top: document.body.scrollTop
      },
    });
  }

  handleLoad() {
    http.request({
      url: '/member/team/list',
      data: {

      },
      success: function (data) {
        this.props.dispatch({
          type: 'index/fetch',
          data: {
            list: data
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

  handleClick(member_id) {
    this.props.dispatch(routerRedux.push({
      pathname: '/team/detail/' + member_id,
      query: {},
    }));
  }

  render() {
    const Item = List.Item;

    return (
      <div>
        {/*<NavBar className={style.header} mode="light" iconName={false}>我的团队</NavBar>*/}
        <div className={style.page2}>
          <WhiteSpace size="lg"/>
          {
            this.props.index.list.length > 0 ?
              <List>
                {
                  this.props.index.list.map((item) => {
                    var content = <div className={style.teamMoney}>
                                    <div>收入：￥{item.member_commission_amount}</div>
                                    <div>进货：￥{item.member_order_amount}</div>
                                  </div>
                    return (
                      <Item arrow="horizontal"
                            extra={item.member_status ? content : '待审核'}
                            wrap key={item.member_id}
                            onClick={this.handleClick.bind(this, item.member_id)}
                      >
                        <div className={style.teamAvatar}>
                          <img src={item.user_avatar} style={{width: '100%', height: '100%'}}/>
                        </div>
                        <div className={style.teamName}>{item.member_name}</div>
                        <div className={style.teamLevel}>
                          {item.member_level_name}
                        </div>
                      </Item>
                    );
                  })
                }
              </List>
              :
              ''
          }
          {
            this.state.is_load && this.props.index.list.length == 0 ?
              <view className={style.noData}>
                <img src={require('../assets/svg/empty.svg')} className={style.noDataImageIcon}></img>
                <view className={style.noDataText}>当前没有数据</view>
              </view>
              :
              ''
          }
        </div>
      </div>
    );
  }
}

Index.propTypes = {};

export default connect(({index, main}) => ({index, main}))(Index);

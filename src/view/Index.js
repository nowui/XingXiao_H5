import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List} from 'antd-mobile';

import constant from '../util/constant';
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
    this.handleLoad();
  }

  componentWillUnmount() {

  }

  handleLoad() {
    http({
      url: '/member/team/list',
      data: {
        page_index: 0,
        page_size: 0,
      },
      success: function (data) {
        this.props.dispatch({
          type: 'team/fetch',
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
    }).post();
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
        <NavBar className={style.header} mode="light" iconName={false}>我的团队</NavBar>
        <div className={style.page2}>
          <WhiteSpace size="lg"/>
          {
            this.props.team.list.length > 0 ?
              <List>
                {
                  this.props.team.list.map((item) => {
                    return (
                      <Item arrow="horizontal"
                            extra={item.member_status ? ('进货额￥' + item.member_total_amount.toFixed(2)) : '待审核'}
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
            this.state.is_load && this.props.team.list.length == 0 ?
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

export default connect(({team}) => ({team}))(Index);

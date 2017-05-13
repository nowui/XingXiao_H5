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
      member: {
        member_level_list: []
      }
    };
  }

  componentDidMount() {
    document.body.scrollTop = 0;

    this.handleLoad();
  }

  componentWillUnmount() {

  }

  handleLoad() {
    http({
      url: '/member/team/find',
      data: {
        member_id: this.props.params.member_id,
      },
      success: function (data) {
        this.setState({
          member: data,
        });
      }.bind(this),
      complete: function () {
        this.setState({
          is_load: true,
        });
      }.bind(this),
    }).post();
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

  handleSubmit() {
    if (this.state.member_level_id == '') {
      Toast.fail('请选择会员等级', constant.duration);
    }

    http({
      url: '/member/children/update',
      data: {
        member_id: this.state.member.member_id,
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
    }).post();
  }

  render() {
    const Item = List.Item;
    const RadioItem = Radio.RadioItem;

    var content = '';

    if (this.state.is_load) {
      if (this.state.member.member_status) {
        content = <div className={style.teamMoney}>
          <div>当月进货：￥{this.state.member.member_total_amount.toFixed(2)}</div>
          <div>全部进货：￥{this.state.member.member_total_amount.toFixed(2)}</div>
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
            <Item
              extra={content}
            >
              <div className={style.teamAvatar}>
                <img src={this.state.member.user_avatar} style={{width: '100%', height: '100%'}}/>
              </div>
              <div className={style.teamName}>{this.state.member.member_name}</div>
              <div className={style.teamLevel}>
                {this.state.member.member_level_name}
              </div>
            </Item>
          </List>
          <WhiteSpace size="lg"/>
          {
            this.state.member.member_status ?
              ''
              :
              <List renderHeader={() => '选择会员等级'}>
                {
                  this.state.member.member_level_list.map((item) => {
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
            this.state.is_load && !this.state.member.member_status ?
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

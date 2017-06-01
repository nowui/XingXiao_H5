import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Radio, Toast} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';
import style from './style.css';

class TeamLevel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_load: false,
      member_level_id: '',
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
    http({
      url: '/member/team/member/level/list',
      data: {
        member_id: this.props.params.member_id
      },
      success: function (data) {
        var member_level_id = '';
        for (var i = 0; i < data.length; i++) {
          if (data[i].is_select) {
            member_level_id = data[i].member_level_id;
          }
        }

        this.setState({
          member_level_id: member_level_id,
          member_level_list: data
        });
      }.bind(this),
      complete: function () {
        this.setState({
          is_load: true
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
      pathname: '/team/detail/' + this.props.params.member_id,
      query: {}
    }));
  }

  handleClick(member_id) {
    this.props.dispatch(routerRedux.push({
      pathname: '/team/level/' + member_id,
      query: {},
    }));
  }

  handleSubmit() {
    if (this.state.member_level_id == '') {
      Toast.fail('请选择会员等级', constant.duration);

      return;
    }

    http({
      url: '/member/children/update',
      data: {
        member_id: this.props.params.member_id,
        member_level_id: this.state.member_level_id
      },
      success: function (data) {
        this.props.dispatch(routerRedux.push({
          pathname: '/team/detail/' + this.props.params.member_id,
          query: {}
        }));
      }.bind(this),
      complete: function () {

      }.bind(this),
    }).post();
  }

  handleClick() {

  }

  render() {
    const Item = List.Item;
    const RadioItem = Radio.RadioItem;

    return (
      <div>
        <NavBar
          className={style.header} mode="light" leftContent="返回"
          onLeftClick={this.handleBack.bind(this)}
        >我的团队</NavBar>
        <div className={style.page2}>
          <WhiteSpace size="lg"/>
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
          <div className={style.footer}>
            <div className={style.buttonSubmit}
                 onClick={this.handleSubmit.bind(this)}
            >重设等级
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TeamLevel.propTypes = {};

export default connect(({}) => ({}))(TeamLevel);

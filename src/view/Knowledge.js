import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Result} from 'antd-mobile';

import constant from '../util/constant';
import wechat from '../util/wechat';
import http from '../util/http';

import style from './style.css';

class Knowledge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_load: true
    }
  }

  componentDidMount() {
    if (this.props.knowledge.list.length == 0) {
      this.handleLoad();
    } else {
      document.body.scrollTop = this.props.knowledge.scroll_top;
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'home/fetch',
      data: {
        scroll_top: document.body.scrollTop
      }
    });
  }

  handleLoad() {
    // http({
    //   url: '/member/team/list',
    //   data: {
    //     page_index: 0,
    //     page_size: 0
    //   },
    //   success: function (data) {
    //     this.props.dispatch({
    //       type: 'knowledge/fetch',
    //       data: {
    //         list: data
    //       }
    //     });
    //   }.bind(this),
    //   complete: function () {
    //     document.body.scrollTop = this.props.knowledge.scroll_top;
    //
    //     this.setState({
    //       is_load: true
    //     });
    //   }.bind(this)
    // }).post();
  }

  handleClick(member_id) {

  }

  render() {
    const Item = List.Item;

    return (
      <div>
        <NavBar className={style.header} mode="light" iconName={false}>知识库</NavBar>
        <div className={style.page}>
          <WhiteSpace size="lg"/>
          <List>
            {
              this.props.knowledge.list.map(function (item) {
                return (
                  <Item wrap key={item.member_id}
                        onClick={this.handleClick.bind(this, item.member_id)}>
                    {item.member_name}
                  </Item>
                )
              }.bind(this))
            }
            {
              this.state.is_load && this.props.knowledge.list.length == 0 ?
                <Result
                  img={<img src={require('../assets/svg/empty.svg')} style={{width: '1.2rem', height: '1.2rem'}}/>}
                  message={constant.empty}
                />
                :
                ''
            }
          </List>
        </div>
      </div>
    );
  }
}

Knowledge.propTypes = {};

export default connect(({knowledge}) => ({knowledge}))(Knowledge);

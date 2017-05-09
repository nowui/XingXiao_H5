import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, Carousel} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

import style from './style.css';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category_list: [],
    };
  }

  componentDidMount() {
    if (this.props.index.list.length == 0) {
      this.handleLoad();
    } else {
      document.body.scrollTop = this.props.index.scroll_top;
    }

    var category_list = constant.category_list.concat();
    category_list.splice(0, 1);
    category_list.push(constant.category_list[0]);

    this.setState({
      category_list,
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'index/fetch',
      data: {
        scroll_top: document.body.scrollTop,
      },
    });
  }

  handleLoad() {
    http({
      url: '/product/hot/list',
      data: {},
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].product_image_file = constant.host + data[i].product_image_file;
        }

        this.props.dispatch({
          type: 'index/fetch',
          data: {
            list: data,
          },
        });
      }.bind(this),
      complete: function () {
        document.body.scrollTop = this.props.index.scroll_top;
      }.bind(this),
    }).post();
  }

  render() {
    return (
      <div>
        <NavBar className={style.header} mode="light" iconName={false}>我的团队</NavBar>
        <div className={style.page2}>

          <div style={{float: 'left', width: '100%', height: '7px'}}/>
        </div>
      </div>
    );
  }
}

Index.propTypes = {};

export default connect(({index}) => ({index}))(Index);

import React, {Component} from 'react';
import {connect} from 'dva';
import {NavBar} from 'antd-mobile';

import style from './style.css';

class knowledge extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <NavBar
          className={style.header} mode="light" iconName={false}
        >知识库</NavBar>
        <div className={style.page}>
          <view className={style.noData}>
            <img src={require('../assets/svg/empty.svg')} className={style.noDataImageIcon}></img>
            <view className={style.noDataText}>当前没有数据</view>
          </view>
        </div>
      </div>
    );
  }
}

knowledge.propTypes = {};

export default connect(({}) => ({}))(knowledge);

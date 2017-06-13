import React, {Component} from 'react';
import {connect} from 'dva';

import style from './style.css';

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'main/fetch',
      data: {
        title: '知识库'
      },
    });

    document.body.scrollTop = 0;
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        {/*<NavBar*/}
          {/*className={style.header} mode="light" iconName={false}*/}
        {/*>知识库</NavBar>*/}
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

Article.propTypes = {};

export default connect(({}) => ({}))(Article);

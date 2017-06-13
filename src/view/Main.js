import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { TabBar } from 'antd-mobile';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      selectedTab: this.props.routes[2].path
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handlePress(tab) {
    this.setState({
      selectedTab: tab,
    });

    this.props.dispatch(routerRedux.push({
      pathname: '/' + tab,
      query: {},
    }));
  }

  render() {
    return (
      <div>
        {
          this.state.title != this.props.main.title ?
            <iframe src=""></iframe>
            :
            ''
        }
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#a72025"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="团队"
            key="index"
            icon={require('../assets/svg/friend.svg')}
            selectedIcon={require('../assets/svg/friend_active.svg')}
            selected={this.state.selectedTab === 'index'}
            onPress={this.handlePress.bind(this, 'index')}
          />
          <TabBar.Item
            title="进货"
            key="product"
            icon={require('../assets/svg/cart.svg')}
            selectedIcon={require('../assets/svg/cart_active.svg')}
            selected={this.state.selectedTab === 'product'}
            onPress={this.handlePress.bind(this, 'product')}
          />
          <TabBar.Item
            title="知识库"
            key="article"
            icon={require('../assets/svg/read.svg')}
            selectedIcon={require('../assets/svg/read_active.svg')}
            selected={this.state.selectedTab === 'article'}
            onPress={this.handlePress.bind(this, 'article')}
          >
          </TabBar.Item>
          <TabBar.Item
            title="个人"
            key="my"
            icon={require('../assets/svg/my.svg')}
            selectedIcon={require('../assets/svg/my_active.svg')}
            selected={this.state.selectedTab === 'my'}
            onPress={this.handlePress.bind(this, 'my')}
          />
        </TabBar>
        {this.props.children}
      </div>
    );
  }
}

Main.propTypes = {};

export default connect(({main}) => ({main}))(Main);

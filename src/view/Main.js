import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {TabBar} from 'antd-mobile';

import database from '../util/database';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: this.props.routes[2].path
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handlePress(tab) {
    this.setState({
      selectedTab: tab
    });


    this.props.dispatch(routerRedux.push({
      pathname: '/' + tab,
      query: {}
    }));
  }

  handlCart() {

  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        handlCart: this.handlCart.bind(this)
      })
    );

    return (
      <div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#a72025"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="团队"
            key="home"
            icon={require('../assets/svg/friend.svg')}
            selectedIcon={require('../assets/svg/friend_active.svg')}
            selected={this.state.selectedTab === 'home'}
            onPress={this.handlePress.bind(this, 'home')}
          >
          </TabBar.Item>
          <TabBar.Item
            title="进货"
            key="product"
            icon={require('../assets/svg/cart.svg')}
            selectedIcon={require('../assets/svg/cart_active.svg')}
            selected={this.state.selectedTab === 'product'}
            onPress={this.handlePress.bind(this, 'product')}
          >
          </TabBar.Item>
          <TabBar.Item
            title="知识库"
            key="knowledge"
            icon={require('../assets/svg/read.svg')}
            selectedIcon={require('../assets/svg/read_active.svg')}
            selected={this.state.selectedTab === 'knowledge'}
            onPress={this.handlePress.bind(this, 'knowledge')}
          >
          </TabBar.Item>
          <TabBar.Item
            title="个人"
            key="mine"
            icon={require('../assets/svg/mine.svg')}
            selectedIcon={require('../assets/svg/mine_active.svg')}
            selected={this.state.selectedTab === 'mine'}
            onPress={this.handlePress.bind(this, 'mine')}
          >
          </TabBar.Item>
        </TabBar>
        {childrenWithProps}
      </div>
    );
  }
}

Main.propTypes = {};

export default connect(({}) => ({}))(Main);

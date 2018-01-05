import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';

import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {
  state = {
    SideDrawerVisible: false
  };

  toggleSideDrawer = () => {
    this.setState(prevState => {
      return { SideDrawerVisible: !prevState.SideDrawerVisible };
    });
  };

  hideSideDrawer = () => {
    this.setState({ SideDrawerVisible: false });
  };

  render() {
    return (
      <Auxiliary>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          toggle={this.toggleSideDrawer}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          show={this.state.SideDrawerVisible}
          hide={this.hideSideDrawer}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);

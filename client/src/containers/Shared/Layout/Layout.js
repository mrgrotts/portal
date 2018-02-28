import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Auxiliary from '../../../hoc/Auxiliary';

import Toolbar from '../../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../../components/UI/Navigation/SideDrawer/SideDrawer';

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
    // console.log(this.props.user.company);
    return (
      <Auxiliary>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          verified={this.props.user.verified}
          company={this.props.user.company}
          toggle={this.toggleSideDrawer}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          verified={this.props.user.verified}
          show={this.state.SideDrawerVisible}
          hide={this.hideSideDrawer}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.token !== null
});

export default withRouter(connect(mapStateToProps)(Layout));

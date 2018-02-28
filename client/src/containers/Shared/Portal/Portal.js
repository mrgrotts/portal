import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import FloatingButton from '../../../components/UI/FloatingButton/FloatingButton';

import classes from './Portal.css';

class Portal extends Component {
  render() {
    let pleaseVerifyMessage;
    if (this.props.isAuthenticated && !this.props.user.verified) {
      pleaseVerifyMessage = (
        <div className={classes.VerifyMessageContainer}>
          <h3 className={classes.VerifyMessage}>Please check {this.props.user.email} for a verification link.</h3>
        </div>
      );
    }

    return (
      <div className={classes.Portal}>
        {pleaseVerifyMessage}
        <Link to="/work/create">
          <FloatingButton>add</FloatingButton>
        </Link>

        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portal));

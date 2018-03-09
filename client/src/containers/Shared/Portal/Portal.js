import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Flash from '../../../components/UI/Flash/Flash';
import FloatingButton from '../../../components/UI/FloatingButton/FloatingButton';

import classes from './Portal.css';

class Portal extends Component {
  render() {
    let flash = null;
    let message = `Please check ${this.props.user.email} for a verification link.`;
    if (this.props.isAuthenticated && !this.props.user.verified) {
      flash = <Flash message={message} color="Red" />;
    }

    return (
      <div className={classes.Portal}>
        {flash}
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

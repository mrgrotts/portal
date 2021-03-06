import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Flash from '../../../components/UI/Flash/Flash';
import FloatingButton from '../../../components/UI/FloatingButton/FloatingButton';

import classes from './Portal.css';

class Portal extends Component {
  state = {
    actions: {
      toggled: false,
      CompanyAction: {
        action: `/companies/${this.props.user.company}`,
        focused: false,
        icon: 'business',
        tooltip: 'Company'
      },
      LocationAction: {
        action: '/locations/create',
        focused: false,
        icon: 'place',
        tooltip: 'Add Location'
      },
      // UserAction: {
      //   action: '/users/create',
      //   focused: false,
      //   icon: 'person',
      //   tooltip: 'Add User'
      // },
      WorkAction: {
        action: '/work/create',
        focused: false,
        icon: 'local_shipping',
        tooltip: 'Add Work'
      }
    }
  };

  render() {
    let actions = null;
    let flash = null;
    let message = `Please check ${this.props.user.email} for a verification link.`;

    if (this.props.isAuthenticated) {
      setTimeout(() => {
        if (!this.props.user.verified) {
          flash = <Flash message={message} color="Red" />;
        }
      }, 2000);

      actions = (
        <Link to="/work/create">
          <FloatingButton>add</FloatingButton>
        </Link>
      );
    }

    return (
      <div className={classes.Portal}>
        {flash}
        {actions}

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

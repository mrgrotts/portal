import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Flash from '../../../components/UI/Flash/Flash';
import FloatingButton from '../../../components/UI/FloatingButton/FloatingButton';

import classes from './Portal.css';

class Portal extends PureComponent {
  renderChildren = children => {
    React.Children.map(children, child => React.cloneElement(child, { ...this.props }));
  };

  render() {
    console.log(this.props.isAuthenticated);
    console.log(this.props.children);
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
        {this.renderChildren(this.props.children)}
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

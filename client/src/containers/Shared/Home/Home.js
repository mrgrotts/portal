import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Auxiliary from '../../../hoc/Auxiliary';

import classes from './Home.css';

class Home extends PureComponent {
  renderChecklist = () => {
    // console.log(this.props.isAuthenticated);
    if (this.props.isAuthenticated && this.props.user.verified && this.props.user.company && this.props.user.locations.length > 0) {
      // console.log('company created');
      return (
        <div className={classes.Home__Checklist}>
          <Link className={classes.Home__Checklist_Item} to="/work/create">
            Create New Work
          </Link>
        </div>
      );
    } else if (this.props.isAuthenticated && this.props.user.verified && this.props.user.company) {
      // console.log('location created');
      return (
        <div className={classes.Home__Checklist}>
          <Link className={classes.Home__Checklist_Item} to="/locations/create">
            Create A Location
          </Link>
          <Link className={classes.Home__Checklist_Item} to="/work/create">
            Create New Work
          </Link>
        </div>
      );
    } else if (this.props.isAuthenticated && this.props.user.verified) {
      // console.log('verified');
      return (
        <div className={classes.Home__Checklist}>
          <Link className={classes.Home__Checklist_Item} to="/companies/create">
            Create Your Company
          </Link>
          <Link className={classes.Home__Checklist_Item} to="/locations/create">
            Create A Location
          </Link>
          <Link className={classes.Home__Checklist_Item} to="/work/create">
            Create New Work
          </Link>
        </div>
      );
    } else if (this.props.isAuthenticated) {
      // console.log('authenticated');
      return (
        <div className={classes.Home__Checklist}>
          <h4 style={{ color: 'darkred' }}>Verify Your Account: {this.props.user.email}</h4>
          <Link className={classes.Home__Checklist_Item} to="/companies/create">
            Create Your Company
          </Link>
          <Link className={classes.Home__Checklist_Item} to="/locations/create">
            Create A Location
          </Link>
          <Link className={classes.Home__Checklist_Item} to="/work/create">
            Create New Work
          </Link>
        </div>
      );
    } else {
      return (
        <Link className={classes.Home__LoginButton} to="/login">
          Login
        </Link>
      );
    }

    // return checklist;
  };

  render() {
    // console.log(this.props);
    return (
      <Auxiliary>
        <h1 className={classes.Home__Title}>Rozalado Services Portal</h1>
        <section className={classes.Home__Container}>
          <div className={classes.Home}>
            <h4 className={classes.Home__Subtitle}>This portal is in open beta.</h4>
            <p className={classes.Home__Message}>
              Please send all support requests to <a href="mailto:joe@rozaladocleaning.com">joe@rozaladocleaning.com</a>
            </p>
            {this.renderChecklist()}
          </div>
        </section>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

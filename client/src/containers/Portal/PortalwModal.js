import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import CreateTicket from '../TicketForm/CreateTicket';

import FloatingButton from '../../components/UI/FloatingButton/FloatingButton';
import Modal from '../../components/UI/Modal/Modal';

import classes from './Portal.css';

class Portal extends Component {
  state = {
    ticketModalVisible: false
  };

  showTicketModal = () => {
    if (this.props.isAuthenticated) {
      this.setState({ ticketModalVisible: true });
    } else {
      console.log(this.props);
      // this.props.authRedirectPath('/review');
      this.props.history.push('/login');
    }
  };

  hideTicketModal = () => {
    this.setState({ ticketModalVisible: false });
  };

  render() {
    return (
      <div className={classes.Portal}>
        <h1 className={classes.PortalTitle}>Portal Component</h1>
        <Link to="/tickets/create">
          <FloatingButton
            isAuthenticated={this.props.isAuthenticated}
            clicked={this.showTicketModal}
          >
            add
          </FloatingButton>
        </Link>

        {this.state.ticketModalVisible ? (
          <Modal show closeModal={this.hideTicketModal}>
            <CreateTicket
              onCreate={this.hideTicketModal}
              onCancel={this.hideTicketModal}
            />
          </Modal>
        ) : null}

        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portal));

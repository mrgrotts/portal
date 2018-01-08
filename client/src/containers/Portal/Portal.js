import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TicketForm from '../TicketForm/TicketForm';

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

  cancelAddTicket = () => {
    this.setState({ ticketModalVisible: false });
  };

  render() {
    return (
      <div className={classes.Portal}>
        <h1 className={classes.PortalTitle}>Portal Component</h1>
        <FloatingButton
          isAuthenticated={this.props.isAuthenticated}
          clicked={this.showTicketModal}
        >
          add
        </FloatingButton>
        <Modal
          show={this.state.ticketModalVisible}
          closeModal={this.cancelAddTicket}
        >
          <TicketForm />
        </Modal>
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

import api from '../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import handleErrors from '../../hoc/handleErrors';

import Spinner from '../../components/UI/Spinner/Spinner';
import TicketForm from './TicketForm';

import * as actions from '../../actions';

class TicketCreate extends Component {
  onSubmit = async ticket => {
    await this.props.createTicket(ticket);
  };

  onCancel = () => {
    this.props.history.push('/tickets');
  };

  render() {
    console.log(this.props.success);
    let form = <Spinner />;

    if (!this.props.loading) {
      form = <TicketForm onSubmit={this.onSubmit} onCancel={this.onCancel} />;
    }

    const redirectAfterSubmit = this.props.success ? (
      <Redirect to="/tickets" />
    ) : null;

    return (
      <div>
        {redirectAfterSubmit}
        <h1>Create Ticket Form</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.auth.id,
  token: state.auth.token,
  loading: state.tickets.loading,
  success: state.tickets.success
});

const mapDispatchToProps = dispatch => ({
  createTicket: ticket => dispatch(actions.createTicket(ticket))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(handleErrors(TicketCreate, api))
);

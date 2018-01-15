import api from '../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import handleErrors from '../../hoc/handleErrors/handleErrors';

import Spinner from '../../components/UI/Spinner/Spinner';
import TicketForm from './TicketForm';

import * as actions from '../../actions';

class CreateTicket extends Component {
  onSubmit = async ticket => {
    // console.log(ticket);
    await this.props.createTicket(ticket);
    this.props.onCreate();
    this.props.history.push('/tickets');
  };

  render() {
    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <TicketForm onSubmit={this.onSubmit} onCancel={this.props.onCancel} />
      );
    }

    return (
      <div>
        <h1>Create Ticket Form</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.auth.id,
  loading: state.tickets.loading,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  createTicket: ticket => dispatch(actions.createTicket(ticket))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(handleErrors(CreateTicket, api))
);

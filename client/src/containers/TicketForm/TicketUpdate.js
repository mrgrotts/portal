import api from '../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import handleErrors from '../../hoc/handleErrors';

import Spinner from '../../components/UI/Spinner/Spinner';
import TicketForm from './TicketForm';

import * as actions from '../../actions';

class TicketUpdate extends Component {
  updateTicket = async ticket => {
    // console.log(ticket);
    await this.props.updateTicket(this.props.ticket._id, ticket);
    this.props.history.push('/tickets');
  };

  onCancel = () => {
    this.props.history.push('/tickets');
  };

  render() {
    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <TicketForm
          onSubmit={this.updateTicket}
          onCancel={this.onCancel}
          ticket={this.props.ticket}
        />
      );
    }

    return (
      <div>
        <h1>Update Ticket Form</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ticket: state.tickets.tickets.find(
    ticket => ticket._id === props.match.params.id
  ),
  id: state.auth.id,
  loading: state.tickets.loading,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  updateTicket: (id, ticket) => dispatch(actions.updateTicket(id, ticket))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(handleErrors(TicketUpdate, api))
);

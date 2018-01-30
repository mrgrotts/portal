import api from '../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import handleErrors from '../../hoc/handleErrors';

import Table from '../../components/UI/Table/Table';

import Spinner from '../../components/UI/Spinner/Spinner';
import Ticket from '../../components/Ticket/Ticket';

import * as actions from '../../actions';

import classes from './Tickets.css';

class Tickets extends Component {
  async componentDidMount() {
    await this.readTickets();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.tickets !== this.props.tickets ||
      nextProps.children !== this.props.children
    );
  }

  readTickets = async () => await this.props.readTickets();

  deleteTicket = async id => await this.props.deleteTicket(id);

  render() {
    let tickets = <Spinner />;

    if (!this.props.loading) {
      tickets = this.props.tickets
        .reverse()
        .map(ticket => (
          <Ticket
            key={ticket._id}
            {...ticket}
            delete={this.deleteTicket.bind(this, ticket._id)}
          />
        ));
    }

    let headers = [
      'Number',
      'Status',
      'Category',
      'Description',
      'Date Received',
      'Actions'
    ];

    return (
      <div className={classes.Tickets}>
        <h1>You Have {tickets.length} Tickets</h1>
        <Table headers={headers}>{tickets}</Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets.tickets,
  loading: state.tickets.loading,
  token: state.auth.token,
  id: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  readTickets: () => dispatch(actions.readTickets()),
  deleteTicket: id => dispatch(actions.deleteTicket(id)),
  readLocation: id => dispatch(actions.readLocation(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(Tickets, api)
);

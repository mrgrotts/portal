import api from '../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import handleErrors from '../../hoc/handleErrors/handleErrors';

import Spinner from '../../components/UI/Spinner/Spinner';
import Ticket from '../../components/Ticket/Ticket';

import * as actions from '../../actions';

import classes from './Tickets.css';

class Tickets extends Component {
  async componentDidMount() {
    await this.props.readTickets();
  }

  updateTicket = async ticket => await this.props.updateTicket(ticket);

  deleteTicket = async id => await this.props.deleteTicket(id);

  render() {
    let tickets = <Spinner />;

    if (!this.props.loading) {
      tickets = this.props.tickets.map(ticket => (
        <div
          key={ticket._id}
          style={{
            width: '100%',
            backgroundColor: 'white'
          }}
        >
          <Ticket
            {...ticket}
            update={this.updateTicket.bind(this, ticket)}
            delete={this.deleteTicket.bind(this, ticket._id)}
          />
        </div>
      ));
    }

    return (
      <div className={classes.Tickets}>
        <h1>You Have {tickets.length} Tickets</h1>
        {tickets}
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
  updateTicket: ticket => dispatch(actions.updateTicket(ticket)),
  deleteTicket: id => dispatch(actions.deleteTicket(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(Tickets, api)
);

import axios from 'axios';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import handleErrors from '../../hoc/handleErrors/handleErrors';

import Map from '../../components/UI/Map/Map';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../actions';

import classes from './Tickets.css';

class Tickets extends Component {
  async componentDidMount() {
    await this.props.readTickets();
  }

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
          <h4>{ticket.status}</h4>
          <p>{ticket.description}</p>
          <ProgressBar />
          <div
            style={{
              height: '300px',
              width: '300px'
            }}
          >
            <Map
              id={ticket._id}
              location={ticket.location}
              latitude={41.88}
              longitude={-87.65}
            />
          </div>
        </div>
      ));
    }

    return (
      <div className={classes.Tickets}>
        <h1>Tickets List</h1>
        {tickets}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets.tickets,
  loading: state.tickets.loading,
  id: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  readTickets: () => dispatch(actions.readTickets())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(Tickets, axios)
);

import api from '../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import handleErrors from '../../hoc/handleErrors/handleErrors';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../actions';

import { validateFields } from '../../utils';

import classes from './TicketForm.css';

class TicketForm extends Component {
  state = {
    category: 'commercialcleaning',
    location: '',
    description: '',
    media: [],
    requestedDate: ''
  };

  addTicket = event => {
    event.preventDefault();

    const ticket = {
      category: this.state.category,
      location: this.state.location,
      description: this.state.description,
      media: this.state.media,
      requestedDate: this.state.requestedDate
    };

    console.log(ticket);
    this.props.createTicket(ticket);
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div>
        <h1>Ticket Form</h1>
        <form onSubmit={this.addTicket}>
          <div>
            <label htmlFor="category">
              Category
              <select
                id="category"
                name="category"
                className={classes.TicketFormControlSelect}
                value={this.state.category}
                onChange={this.handleChange}
              >
                <option value="commercialcleaning">Commercial Cleaning</option>
                <option value="residentialcleaning">
                  Residential Cleaning
                </option>
                <option value="drywallinstallation">
                  Drywall Installation
                </option>
                <option value="electrician">Electrician</option>
                <option value="floorservices">Floor Services</option>
                <option value="maintenance">Maintenance</option>
                <option value="painter">Painter</option>
                <option value="pestcontrol">Pest Control</option>
                <option value="plumber">Plumber</option>
                <option value="postconstruction">Post Construction</option>
                <option value="windowwashing">Window Washing</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="location">
              Location
              <input
                id="location"
                type="text"
                name="location"
                className={classes.TicketFormControl}
                value={this.state.location}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="media">
              Upload Image
              <input
                id="media"
                type="file"
                name="media"
                className={classes.TicketFormControl}
              />
            </label>
          </div>
          <div>
            <label htmlFor="requested-date">
              Requested Date
              <input
                id="requested-date"
                type="text"
                name="requestedDate"
                className={classes.TicketFormControl}
                value={this.state.requestedDate}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                type="text"
                name="description"
                className={classes.TicketFormControlArea}
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <Button ButtonType="Success">Submit</Button>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(TicketForm, api)
);

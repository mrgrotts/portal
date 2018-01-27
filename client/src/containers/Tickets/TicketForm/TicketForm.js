import api from '../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import Auxiliary from '../../../hoc/Auxiliary';
import handleErrors from '../../../hoc/handleErrors';

import Button from '../../../components/UI/Button/Button';
// import Input from '../../components/UI/Input/Input';

// import validateFields from '../../utils/validateFields';

import * as actions from '../../../actions';

import classes from './TicketForm.css';

class TicketForm extends Component {
  static defaultProps = {
    onCancel() {}
  };

  state = {
    status: this.props.ticket ? this.props.ticket.status : 'Unassigned',
    category: this.props.ticket
      ? this.props.ticket.category
      : 'Commercial Cleaning',
    location: this.props.ticket ? this.props.ticket.location : '',
    previousLocation: this.props.ticket ? this.props.ticket.location : '',
    description: this.props.ticket ? this.props.ticket.description : '',
    media: this.props.ticket ? this.props.ticket.media : [],
    requestedDate: this.props.ticket
      ? moment(this.props.ticket.requestedDate)
      : moment(),
    focused: false
  };

  async componentDidMount() {
    await this.props.readLocations();
    console.log(this.props.locations);

    if (this.state.location === '' && this.props.locations.length !== 0) {
      this.setState({
        location: this.props.locations[0]._id
      });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCalendarDateChange = requestedDate => this.setState({ requestedDate });

  onCalendarFocusChange = ({ focused }) => this.setState(() => ({ focused }));

  onSubmit = event => {
    event.preventDefault();

    this.props.onSubmit({
      status: this.state.status,
      category: this.state.category,
      location: this.state.location,
      previousLocation: this.state.previousLocation,
      description: this.state.description,
      media: this.state.media,
      requestedDate: this.state.requestedDate.valueOf()
    });

    console.log(this.state);
  };

  onCancel = event => {
    this.props.onCancel();

    this.setState({
      status: this.props.ticket ? this.props.ticket.status : 'Unassigned',
      category: this.props.ticket
        ? this.props.ticket.category
        : 'Commercial Cleaning',
      location: this.props.ticket ? this.props.ticket.location._id : '',
      previousLocation: this.props.ticket
        ? this.props.ticket.previousLocation
        : '',
      description: this.props.ticket ? this.props.ticket.description : '',
      media: this.props.ticket ? this.props.ticket.media : [],
      requestedDate: this.props.ticket
        ? moment(this.props.ticket.requestedDate)
        : moment()
    });
  };

  render() {
    let selectLocation = (
      <div className={classes.TicketFormInputContainer}>
        <Link className={classes.TicketFormAddLocation} to="/locations/create">
          Add Location
        </Link>
      </div>
    );

    if (!this.props.loading && this.props.locations.length !== 0) {
      selectLocation = (
        <div className={classes.TicketFormInputContainer}>
          <label htmlFor="location">
            Location
            <select
              className={classes.TicketFormControlSelect}
              name="location"
              onChange={this.handleChange}
              value={this.state.location}
            >
              {this.props.locations.map(location => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>
          </label>
          <Link
            className={classes.TicketFormAddLocation}
            to="/locations/create"
          >
            Add Location
          </Link>
        </div>
      );
    }

    return (
      <Auxiliary>
        <form onSubmit={this.onSubmit}>
          <div className={classes.TicketFormInputContainer}>
            <label htmlFor="category">
              Category
              <select
                id="category"
                name="category"
                className={classes.TicketFormControlSelect}
                value={this.state.category}
                onChange={this.handleChange}
              >
                <option value="Commercial Cleaning">Commercial Cleaning</option>
                <option value="Residential Cleaning">
                  Residential Cleaning
                </option>
                <option value="Drywall Installation">
                  Drywall Installation
                </option>
                <option value="Electrician">Electrician</option>
                <option value="Floor Services">Floor Services</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Painter">Painter</option>
                <option value="Pest Control">Pest Control</option>
                <option value="Plumber">Plumber</option>
                <option value="Post Construction">Post Construction</option>
                <option value="Window Washing">Window Washing</option>
              </select>
            </label>
          </div>

          {this.props.ticket ? null : selectLocation}

          <div className={classes.TicketFormInputContainer}>
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
          <div className={classes.TicketFormInputContainer}>
            <label htmlFor="requested-date">
              Requested Date
              <SingleDatePicker
                id="date_input"
                date={this.state.requestedDate}
                onDateChange={this.onCalendarDateChange}
                focused={this.state.focused}
                onFocusChange={this.onCalendarFocusChange}
                numberOfMonths={1}
              />
            </label>
          </div>
          <div className={classes.TicketFormInputContainer}>
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
          <Button ButtonType="Success" type="submit">
            Submit
          </Button>
          <Button ButtonType="Failure" clicked={this.onCancel} type="button">
            Cancel
          </Button>
        </form>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations.locations,
  loading: state.locations.loading
});

const mapDispatchToProps = dispatch => ({
  readLocations: () => dispatch(actions.readLocations())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(TicketForm, api)
);

// <input
//   id="requested-date"
//   type="text"
//   name="requestedDate"
//   className={classes.TicketFormControl}
//   value={this.state.requestedDate}
//   onChange={this.handleChange}
// />

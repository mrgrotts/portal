import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
// import Input from '../../components/UI/Input/Input';

// import validateFields from '../../utils/validateFields';

import classes from './TicketForm.css';

export default class TicketForm extends Component {
  static defaultProps = {
    onCancel() {}
  };

  state = {
    category: this.props.ticket
      ? this.props.ticket.category
      : 'Commercial Cleaning',
    location: this.props.ticket ? this.props.ticket.location : '',
    description: this.props.ticket ? this.props.ticket.description : '',
    media: this.props.ticket ? this.props.ticket.media : [],
    requestedDate: this.props.ticket ? this.props.ticket.requestedDate : ''
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();

    this.props.onSubmit({
      category: this.state.category,
      location: this.state.location,
      description: this.state.description,
      media: this.state.media,
      requestedDate: this.state.requestedDate
    });
  };

  onCancel = event => {
    this.props.onCancel();

    this.setState({
      category: this.props.ticket
        ? this.props.ticket.category
        : 'Commercial Cleaning',
      location: this.props.ticket ? this.props.ticket.location : '',
      description: this.props.ticket ? this.props.ticket.description : '',
      media: this.props.ticket ? this.props.ticket.media : [],
      requestedDate: this.props.ticket ? this.props.ticket.requestedDate : ''
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
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
          <Button ButtonType="Success" type="submit">
            Submit
          </Button>
          <Button ButtonType="Failure" clicked={this.onCancel} type="button">
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

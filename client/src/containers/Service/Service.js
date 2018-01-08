import api from '../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import handleErrors from '../../hoc/handleErrors/handleErrors';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../../actions';

import { validateFields } from '../../../utils/utils';

import classes from './Service.css';

class Service extends Component {
  state = {
    // ticket: {
    //   category: '',
    //   location: '',
    //   description: '',
    //   media: [],
    //   requestedDate: Date.now
    // }
    ticket: {
      category: {
        fieldType: 'select',
        value: '',
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      location: {
        fieldType: 'input',
        fieldConfig: {
          type: 'text',
          placeholder: 'Location'
        },
        value: '',
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      description: {
        fieldType: 'input',
        fieldConfig: {
          type: 'text',
          placeholder: 'Description'
        },
        value: '',
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      media: {
        fieldType: 'input',
        fieldConfig: {
          type: 'file'
        },
        value: '',
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      requestedDate: {
        fieldType: 'input',
        fieldConfig: {
          type: 'text',
          placeholder: 'Requested Date'
        },
        value: '',
        validation: {
          required: true
        },
        touched: false,
        valid: false
      }
    },
    formValid: false
  };

  submitTicket = event => {
    const { features, total, id } = this.props;
    event.preventDefault();

    const customer = {};

    for (let field in this.state.ticket) {
      customer[field] = this.state.ticket[field].value;
    }

    const ticket = { customer, features, total, id };

    this.props.createTicket(ticket);
  };

  updateField = (event, field) => {
    // 2 spreads to deeply clone state and get copies of nested properties from state
    const updatedForm = {
      ...this.state.form
    };

    const updatedField = {
      ...updatedForm[field]
    };

    // update value property on individual field
    updatedField.value = event.target.value;

    // update valid status
    updatedField.valid = validateFields(
      updatedField.value,
      updatedField.validation
    );
    updatedField.touched = true;

    // update copied state object
    updatedForm[field] = updatedField;

    // console.log(updatedField);
    // check form validity
    let formValid = true;

    for (let field in updatedForm) {
      formValid = updatedForm[field].valid && formValid;
    }

    // update state
    this.setState({ form: updatedForm, formValid });
  };

  render() {
    const formFields = [];

    // loop over this.state.form object and push values to formFields array with config
    for (let field in this.state.form) {
      formFields.push({
        id: field,
        config: this.state.form[field]
      });
    }

    let form = (
      <form onSubmit={this.placeOrder}>
        {formFields.map(field => (
          <Input
            key={field.id}
            update={event => this.updateField(event, field.id)}
            fieldType={field.config.fieldType}
            fieldConfig={field.config.fieldConfig}
            value={field.config.value}
            validation={field.config.validation}
            touched={field.config.touched}
            invalid={!field.config.valid}
          />
        ))}
        <Button ButtonType="Success" disabled={!this.state.formValid}>
          Submit
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.Service}>
        <h4>Submit Ticket</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.auth.id,
  loading: state.order.loading,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  createTicket: ticket => dispatch(actions.createTicket(ticket))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(Service, api)
);

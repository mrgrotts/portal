import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Auxiliary from '../../../../hoc/Auxiliary';
import handleErrors from '../../../../hoc/handleErrors';

import AutocompleteWrapper from '../../../../components/UI/Maps/Autocomplete/Autocomplete';
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';
import Spinner from '../../../../components/UI/Spinner/Spinner';

import { toTitleCase } from '../../../../utils/transformString';
import validateFields from '../../../../utils/validateFields';

import * as actions from '../../../../actions';

import classes from './CompanyForm.css';

class CompanyForm extends Component {
  static defaultProps = {
    onSubmit() {},
    onCancel() {}
  };

  state = {
    companyForm: {
      name: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'Company Name' },
        value: this.props.company ? this.props.company.name : '',
        validation: { required: true },
        touched: false,
        valid: this.props.company ? true : false
      },
      domain: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'Company Domain' },
        value: this.props.company ? this.props.company.name : '',
        validation: { required: true, isURL: true },
        touched: false,
        valid: this.props.company ? true : false
      },
      phone: {
        fieldType: 'input',
        fieldConfig: { type: 'tel', placeholder: 'Phone Number' },
        value: this.props.company ? this.props.company.phone : '',
        validation: { required: false, isPhoneNumber: true },
        touched: false,
        valid: this.props.company ? true : false
      }
    },
    formValid: false,
    createdAt: this.props.company ? moment(this.props.company.createdAt) : moment(),
    updatedAt: this.props.company ? moment(this.props.company.updatedAt) : moment()
  };

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  updateField = (event, field) => {
    // 2 spreads to deeply clone state and get copies of nested properties from state
    const companyForm = {
      ...this.state.companyForm,
      [field]: {
        ...this.state.companyForm[field],
        value: event.target.value,
        valid: validateFields(event.target.value, this.state.companyForm[field].validation),
        touched: true
      }
    };

    // check form validity
    let formValid = true;

    for (let field in companyForm) {
      formValid = companyForm[field].valid && formValid;
    }

    return this.setState({ companyForm, formValid });
  };

  onSubmit = event => {
    event.preventDefault();
    // console.log(this.state);

    return this.props.onSubmit({
      name: this.state.companyForm.name.value,
      domain: this.state.companyForm.domain.value,
      phone: this.state.companyForm.phone.value
    });
  };

  onCancel = event => {
    this.props.onCancel();

    this.setState({
      companyForm: {
        name: this.props.company ? this.props.company.name : '',
        domain: this.props.company ? this.props.company.domain : '',
        phone: this.props.company ? this.props.company.phone : ''
      },
      createdAt: this.props.company ? moment(this.props.company.createdAt) : moment(),
      updatedAt: this.props.company ? moment(this.props.company.updatedAt) : moment()
    });
  };

  render() {
    // console.log(this.state);
    // console.log(this.props.work);
    let companyFields = [];
    for (let key in this.state.companyForm) {
      companyFields.push({
        id: key,
        config: this.state.companyForm[key]
      });
    }

    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <form className={classes.CompanyForm}>
          {companyFields.map(field => (
            <div key={field.id}>
              <Input
                key={field.id}
                label={toTitleCase(field.id)}
                name={field.id}
                update={event => this.updateField(event, field.id)}
                fieldType={field.config.fieldType}
                fieldConfig={field.config.fieldConfig}
                value={field.config.value}
                validation={field.config.validation}
                touched={field.config.touched}
                invalid={!field.config.valid}
              />
            </div>
          ))}
          <Button ButtonType="Success" clicked={this.onSubmit} type="button">
            Submit
          </Button>
          <Button ButtonType="Failure" clicked={this.onCancel} type="button">
            Cancel
          </Button>
        </form>
      );
    }

    return <Auxiliary>{form}</Auxiliary>;
  }
}

const mapStateToProps = state => ({
  company: state.company.company,
  loading: state.company.loading
});

const mapDispatchToProps = dispatch => ({
  readCompany: userId => dispatch(actions.readCompany(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(handleErrors(CompanyForm, api));

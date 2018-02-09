import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import Auxiliary from '../../../../hoc/Auxiliary';
import handleErrors from '../../../../hoc/handleErrors';

import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';
import ProgressBar from '../../../../components/UI/ProgressBar/ProgressBar';
import Spinner from '../../../../components/UI/Spinner/Spinner';

import { toTitleCase } from '../../../../utils/transformString';
import validateFields from '../../../../utils/validateFields';

import * as actions from '../../../../actions';

import classes from './WorkForm.css';

class WorkForm extends Component {
  static defaultProps = {
    onSubmit() {},
    onCancel() {}
  };

  state = {
    workForm: {
      status: {
        fieldType: 'select',
        fieldConfig: {
          options: [
            {
              label: 'Unassigned',
              value: 'Unassigned'
            },
            {
              label: 'Prep',
              value: 'Prep'
            },
            {
              label: 'On Hold',
              value: 'On Hold'
            },
            {
              label: 'In Progress',
              value: 'In Progress'
            },
            {
              label: 'Pending',
              value: 'Pending'
            },
            {
              label: 'Purchasing Parts',
              value: 'Purchasing Parts'
            },
            {
              label: 'Ordered Parts',
              value: 'Ordered Parts'
            },
            {
              label: 'Closed',
              value: 'Closed'
            }
          ]
        },
        value: this.props.work ? this.props.work.status : 'Unassigned',
        validation: {
          required: true
        },
        touched: false,
        valid: this.props.work ? true : false
      },
      category: {
        fieldType: 'select',
        fieldConfig: {
          options: [
            {
              label: 'Commercial Cleaning',
              value: 'Commercial Cleaning'
            },
            {
              label: 'Residential Cleaning',
              value: 'Residential Cleaning'
            },
            {
              label: 'Drywall Installation',
              value: 'Drywall Installation'
            },
            {
              label: 'Electrician',
              value: 'Electrician'
            },
            {
              label: 'Floor Services',
              value: 'Floor Services'
            },
            {
              label: 'Maintenance',
              value: 'Maintenance'
            },
            {
              label: 'Painter',
              value: 'Painter'
            },
            {
              label: 'Pest Control',
              value: 'Pest Control'
            },
            {
              label: 'Plumber',
              value: 'Plumber'
            },
            {
              label: 'Post Construction',
              value: 'Post Construction'
            },
            {
              label: 'Window Washing',
              value: 'Window Washing'
            }
          ]
        },
        value: this.props.work ? this.props.work.category : 'Commercial Cleaning',
        validation: {
          required: true
        },
        touched: false,
        valid: this.props.work ? true : false
      },
      location: {
        fieldType: 'select',
        fieldConfig: {
          options: [
            {
              label: 'No Locations',
              value: 'No Locations'
            }
          ]
        },
        value: this.props.work ? this.props.work.location : '',
        validation: {
          required: true
        },
        touched: false,
        valid: this.props.work ? true : false
      },
      description: {
        fieldType: 'textarea',
        fieldConfig: {
          type: 'text',
          placeholder: 'Description'
        },
        value: this.props.work ? this.props.work.description : '',
        validation: {
          required: true,
          minLength: 1
        },
        touched: false,
        valid: this.props.work ? true : false
      },
      media: {
        fieldType: 'file',
        fieldConfig: {
          type: 'file',
          placeholder: 'No files uploaded'
        },
        value: this.props.work ? this.props.work.media : [],
        validation: {},
        touched: false,
        valid: this.props.work ? true : false
      }
    },
    previousLocation: this.props.work ? this.props.work.location : '',
    // media: this.props.work ? this.props.work.media : [],
    requestedDate: this.props.work ? moment(this.props.work.requestedDate) : moment(),
    createdAt: this.props.work ? moment(this.props.work.createdAt) : moment(),
    updatedAt: this.props.work ? moment(this.props.work.updatedAt) : moment(),
    focused: false,
    formValid: false
  };

  async componentDidMount() {
    await this.props.readLocations();
    // console.log(this.props.locations);

    if (this.state.location === '' && this.props.locations.length !== 0) {
      this.setState({
        location: this.props.locations[0]._id
      });
    }

    let options = [];
    this.props.locations.map(location => {
      let option = {
        label: location.name,
        value: location._id
      };

      return options.push(option);
    });

    const workForm = {
      ...this.state.workForm,
      location: {
        ...this.state.workForm.location,
        fieldConfig: {
          options
        }
      }
    };

    this.setState({ workForm });
  }

  updateField = (event, field) => {
    // 2 spreads to deeply clone state and get copies of nested properties from state
    const workForm = {
      ...this.state.workForm,
      [field]: {
        ...this.state.workForm[field],
        value: event.target.value,
        valid: validateFields(event.target.value, this.state.workForm[field].validation),
        touched: true
      }
    };

    // check form validity
    let formValid = true;

    for (let field in workForm) {
      formValid = workForm[field].valid && formValid;
    }

    return this.setState({ workForm, formValid });
  };

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  onCalendarDateChange = requestedDate => this.setState({ requestedDate });

  onCalendarFocusChange = ({ focused }) => this.setState({ focused });

  onSubmit = event => {
    event.preventDefault();

    this.props.onSubmit({
      status: this.state.workForm.status.value,
      category: this.state.workForm.category.value,
      location: this.state.workForm.location.value,
      previousLocation: this.state.previousLocation,
      description: this.state.workForm.description.value,
      media: this.state.workForm.media.value,
      requestedDate: this.state.requestedDate
    });

    // console.log(this.state);
  };

  onCancel = event => {
    this.props.onCancel();

    this.setState({
      workForm: {
        status: {
          value: this.props.work ? this.props.work.status : 'Unassigned'
        },
        category: {
          value: this.props.work ? this.props.work.category : 'Commercial Cleaning'
        },
        location: {
          value: this.props.work ? this.props.work.location._id : ''
        },
        description: {
          value: this.props.work ? this.props.work.description : ''
        },
        media: this.props.work ? this.props.work.media : []
      },
      previousLocation: this.props.work ? this.props.work.previousLocation : '',
      // media: this.props.work ? this.props.work.media : [],
      requestedDate: this.props.work ? moment(this.props.work.requestedDate) : moment(),
      createdAt: this.props.work ? moment(this.props.work.createdAt) : moment(),
      updatedAt: this.props.work ? moment(this.props.work.updatedAt) : moment()
    });
  };

  render() {
    // console.log(this.props.work);
    let workFields = [];
    for (let key in this.state.workForm) {
      workFields.push({
        id: key,
        config: this.state.workForm[key]
      });
    }

    let progress = this.props.work === undefined ? null : <ProgressBar />;

    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <form className={classes.WorkForm} onSubmit={this.onSubmit}>
          {workFields.map(field => {
            if (!this.props.work && field.id === 'status') {
              return null;
            }

            if (this.props.locations.length === 0 && field.id === 'location') {
              return (
                <div key={field.id} className={classes.WorkFormInputContainer}>
                  <div className={classes.WorkFormAddLocation}>
                    <label className={classes.WorkFormAddLocationLabel} htmlFor={field.id}>
                      {toTitleCase(field.id)}
                    </label>
                    <Link className={classes.WorkFormAddLocationButton} to="/locations/create">
                      Add Location
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <div key={field.id} className={classes.WorkFormInputContainer}>
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
            );
          })}

          <div className={classes.WorkFormInputContainer}>
            <label htmlFor="requested-date">
              Requested Date
              <SingleDatePicker
                id="date_input"
                date={this.state.requestedDate}
                onDateChange={this.onCalendarDateChange}
                focused={this.state.focused}
                onFocusChange={this.onCalendarFocusChange}
                numberOfMonths={1}
                keepOpenOnDateSelect
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
      );
    }

    return (
      <Auxiliary>
        <div style={{ width: '100%' }}>{progress}</div>
        {form}
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

export default connect(mapStateToProps, mapDispatchToProps)(handleErrors(WorkForm, api));

// <input
//   id="requested-date"
//   type="text"
//   name="requestedDate"
//   className={classes.WorkFormControl}
//   value={this.state.requestedDate}
//   onChange={this.handleChange}
// />

// ALWAYS OPEN DATE PICKER (also set focused state to true)
// <SingleDatePicker
//   id="date_input"
//   date={this.state.requestedDate}
//   onDateChange={this.onCalendarDateChange}
//   focused={this.state.focused}
//   onFocusChange={() => {}}
//   numberOfMonths={1}
//   keepOpenOnDateSelect
// />

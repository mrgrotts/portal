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

// const defaultProps = {
//   // input related props
//   id: 'date',
//   placeholder: 'Date',
//   disabled: false,
//   required: false,
//   screenReaderInputMessage: '',
//   showClearDate: false,
//   showDefaultInputIcon: false,
//   customInputIcon: null,
//   block: false,
//   small: false,
//   regular: false,
//   verticalSpacing: undefined,
//   keepFocusOnInput: false,

//   // calendar presentation and interaction related props
//   renderMonth: null,
//   orientation: HORIZONTAL_ORIENTATION,
//   anchorDirection: ANCHOR_LEFT,
//   horizontalMargin: 0,
//   withPortal: false,
//   withFullScreenPortal: false,
//   initialVisibleMonth: null,
//   numberOfMonths: 2,
//   keepOpenOnDateSelect: false,
//   reopenPickerOnClearDate: false,
//   isRTL: false,

//   // navigation related props
//   navPrev: null,
//   navNext: null,
//   onPrevMonthClick() {},
//   onNextMonthClick() {},
//   onClose() {},

//   // day presentation and interaction related props
//   renderCalendarDay: undefined,
//   renderDayContents: null,
//   enableOutsideDays: false,
//   isDayBlocked: () => false,
//   isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
//   isDayHighlighted: () => {},

//   // internationalization props
//   displayFormat: () => moment.localeData().longDateFormat('L'),
//   monthFormat: 'MMMM YYYY',
//   phrases: SingleDatePickerPhrases,
// };
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
            { label: 'Unassigned', value: 'Unassigned' },
            { label: 'Pending', value: 'Pending' },
            { label: 'Prep', value: 'Prep' },
            { label: 'In Progress', value: 'In Progress' },
            { label: 'On Hold', value: 'On Hold' },
            { label: 'Purchasing Parts', value: 'Purchasing Parts' },
            { label: 'Ordered Parts', value: 'Ordered Parts' },
            { label: 'Closed', value: 'Closed' }
          ]
        },
        value: this.props.work ? this.props.work.status : 'Unassigned',
        validation: { required: true },
        touched: false,
        valid: this.props.work ? true : false
      },
      category: {
        fieldType: 'select',
        fieldConfig: {
          options: [
            { label: 'Commercial Cleaning', value: 'Commercial Cleaning' },
            { label: 'Residential Cleaning', value: 'Residential Cleaning' },
            { label: 'Drywall Installation', value: 'Drywall Installation' },
            { label: 'Electrician', value: 'Electrician' },
            { label: 'Floor Services', value: 'Floor Services' },
            { label: 'Maintenance', value: 'Maintenance' },
            { label: 'Painter', value: 'Painter' },
            { label: 'Pest Control', value: 'Pest Control' },
            { label: 'Plumber', value: 'Plumber' },
            { label: 'Post Construction', value: 'Post Construction' },
            { label: 'Window Washing', value: 'Window Washing' }
          ]
        },
        value: this.props.work ? this.props.work.category : 'Commercial Cleaning',
        validation: { required: true },
        touched: false,
        valid: this.props.work ? true : false
      },
      location: {
        fieldType: 'select',
        fieldConfig: { options: [{ label: 'No Locations', value: 'No Locations' }] },
        value: this.props.work ? this.props.work.location : '',
        validation: { required: true },
        touched: false,
        valid: this.props.work ? true : false
      },
      description: {
        fieldType: 'textarea',
        fieldConfig: { type: 'text', placeholder: 'Description' },
        value: this.props.work ? this.props.work.description : '',
        validation: { required: true, minLength: 1 },
        touched: false,
        valid: this.props.work ? true : false
      },
      message: {
        fieldType: 'textarea',
        fieldConfig: { type: 'text', placeholder: 'Your Message' },
        value: '',
        validation: { required: false },
        touched: false,
        valid: this.props.work ? true : false
      },
      assignedTo: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: 'Assigned To' },
        value: this.props.work ? this.props.work.assignedTo : '',
        validation: { required: false },
        touched: false,
        valid: this.props.work ? true : false
      },
      workCompleted: {
        fieldType: 'textarea',
        fieldConfig: { type: 'text', placeholder: 'Work items completed, one per line' },
        value: this.props.work ? this.props.work.workCompleted : '',
        validation: { required: false },
        touched: false,
        valid: this.props.work ? true : false
      },
      hoursSpent: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: '0' },
        value: this.props.work ? this.props.work.hoursSpent : '',
        validation: { required: false },
        touched: false,
        valid: this.props.work ? true : false
      },
      hourlyRate: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: '35' },
        value: this.props.work ? this.props.work.description : '',
        validation: { required: false },
        touched: false,
        valid: this.props.work ? true : false
      },
      requestedDeletion: {
        fieldType: 'checkbox',
        fieldConfig: { checked: false },
        value: false,
        validation: { required: false },
        touched: false,
        valid: this.props.work ? true : false
      },
      uploads: {
        fieldType: 'file',
        fieldConfig: { type: 'file', placeholder: 'No files uploaded' },
        value: [],
        validation: {},
        touched: false,
        valid: this.props.work ? true : false
      }
    },
    messages: this.props.work ? this.props.work.messages : [],
    media: this.props.work ? this.props.work.media : [],
    date: {
      requestedDate: {
        label: 'Requested Date',
        selectedDate: this.props.work ? moment(this.props.work.requestedDate) : moment(),
        focused: false
      },
      scheduledFor: {
        label: 'Scheduled For',
        selectedDate: this.props.work ? moment(this.props.work.scheduledFor) : moment(),
        focused: false
      },
      partPurchasedDate: {
        label: 'Part Purchased Date',
        selectedDate: this.props.work ? moment(this.props.work.partPurchasedDate) : moment(),
        focused: false
      },
      partArrivedDate: {
        label: 'Part Arrived Date',
        selectedDate: this.props.work ? moment(this.props.work.partArrivedDate) : moment(),
        focused: false
      },
      completedDate: {
        label: 'Completed Date',
        selectedDate: this.props.work ? moment(this.props.work.completedDate) : moment(),
        focused: false
      }
    },
    createdAt: this.props.work ? moment(this.props.work.createdAt) : moment(),
    updatedAt: this.props.work ? moment(this.props.work.updatedAt) : moment(),
    formValid: false
  };

  async componentDidMount() {
    await this.props.readLocations();
    // console.log(this.props.locations[0]._id);
    // console.log(this.state.workForm.location.value);

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
        },
        value: this.props.locations[0]._id
      }
    };

    // console.log(workForm);
    return this.setState({ workForm });
  }

  updateField = (event, field) => {
    // 2 spreads to deeply clone state and get copies of nested properties from state
    const workForm = {
      ...this.state.workForm,
      [field]: {
        ...this.state.workForm[field],
        value: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        valid: validateFields(event.target.value, this.state.workForm[field].validation),
        touched: true
      }
    };

    // check form validity
    let formValid = true;

    for (let field in workForm) {
      formValid = workForm[field].valid && formValid;
    }

    // console.log(workForm);
    return this.setState({ workForm, formValid });
  };

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  onCalendarDateChange = (selectedDate, field) => {
    console.log(selectedDate, field);
    const date = {
      ...this.state.date,
      [field]: {
        ...this.state.date[field],
        selectedDate: selectedDate
      }
    };

    console.log(date);
    console.log(date[field]);
    console.log(this.state.date[field]);
    console.log(this.state.date[field].selectedDate);

    return this.setState({ date });
  };

  onCalendarFocusChange = (focused, field) => {
    console.log(focused, field);
    const date = {
      ...this.state.date,
      [field]: {
        ...this.state.date[field],
        focused
      }
    };

    return this.setState({ date });
  };

  onSubmit = event => {
    event.preventDefault();

    this.props.onSubmit({
      status: this.state.workForm.status.value,
      category: this.state.workForm.category.value,
      location: this.state.workForm.location.value,
      description: this.state.workForm.description.value,
      message: this.state.workForm.message.value,
      assignedTo: this.state.workForm.assignedTo.value,
      workCompleted: this.state.workForm.workCompleted.value,
      hoursSpent: this.state.workForm.hoursSpent.value,
      hourlyRate: this.state.workForm.hourlyRate.value,
      requestedDeletion: this.state.workForm.requestedDeletion.value,
      uploads: this.state.workForm.uploads.value,
      requestedDate: this.state.date.requestedDate.selectedDate,
      scheduledFor: this.state.date.scheduledFor.selectedDate,
      partPurchasedDate: this.state.date.partPurchasedDate.selectedDate,
      partArrivedDate: this.state.date.partArrivedDate.selectedDate,
      completedDate: this.state.date.completedDate.selectedDate,
      messages: this.state.messages,
      media: this.state.media
    });

    // console.log(this.state);
  };

  onCancel = event => {
    this.props.onCancel();

    this.setState({
      workForm: {
        status: { value: this.props.work ? this.props.work.status : 'Unassigned' },
        category: { value: this.props.work ? this.props.work.category : 'Commercial Cleaning' },
        location: { value: this.props.work ? this.props.work.location._id : '' },
        description: { value: this.props.work ? this.props.work.description : '' },
        message: this.state.workForm.message.value,
        assignedTo: this.state.workForm.assignedTo.value,
        workCompleted: this.state.workForm.workCompleted.value,
        hoursSpent: this.state.workForm.hoursSpent.value,
        hourlyRate: this.state.workForm.hourlyRate.value,
        requestedDeletion: this.state.workForm.requestedDeletion.value,
        uploads: []
      },
      date: {
        requestedDate: this.props.work ? moment(this.props.work.requestedDate) : moment(),
        scheduledFor: this.props.work ? moment(this.props.work.scheduledFor) : moment(),
        partPurchasedDate: this.props.work ? moment(this.props.work.partPurchasedDate) : moment(),
        partArrivedDate: this.props.work ? moment(this.props.work.partArrivedDate) : moment(),
        completedDate: this.props.work ? moment(this.props.work.completedDate) : moment()
      },
      messages: this.props.work ? this.props.work.messages : [],
      media: this.props.work ? this.props.work.media : [],
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

    let dateFields = [];
    for (let key in this.state.date) {
      dateFields.push({
        id: key,
        config: this.state.date[key]
      });
    }

    let progress = this.props.work === undefined ? null : <ProgressBar progress={this.props.status} />;

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

          {dateFields.map(field => {
            return (
              <div key={field.id} className={classes.WorkFormInputContainer}>
                <label htmlFor={field.id}>
                  {field.config.label}
                  <SingleDatePicker
                    key={field.id}
                    id={field.id}
                    date={field.config.selectedDate}
                    onDateChange={date => this.onCalendarDateChange(date, field.id)}
                    focused={field.config.focused}
                    onFocusChange={({ focused }) => this.onCalendarFocusChange(focused, field.id)}
                    numberOfMonths={1}
                    withPortal
                  />
                </label>
              </div>
            );
          })}

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
        {progress}
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

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
            { label: 'Unassigned', value: 'Unassigned' },
            { label: 'Pending', value: 'Pending' },
            { label: 'Prep', value: 'Prep' },
            { label: 'In Progress', value: 'In Progress' },
            { label: 'On Hold', value: 'On Hold' },
            { label: 'Purchasing Parts', value: 'Purchasing Parts' },
            { label: 'Ordered Parts', value: 'Ordered Parts' },
            { label: 'Closed', value: 'Closed' },
            { label: 'Requested Deletion', value: 'Requested Deletion' }
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
        fieldConfig: {
          options: [{ label: 'No Locations', value: 'No Locations' }]
        },
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
        fieldConfig: {
          type: 'text',
          placeholder: 'Work items completed, one per line'
        },
        value: this.props.work ? this.props.work.workCompleted : '',
        validation: { required: false },
        touched: false,
        valid: this.props.work ? true : false
      },
      hoursSpent: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: '0' },
        value: this.props.work ? this.props.work.hoursSpent : 0,
        validation: { required: false },
        touched: false,
        valid: this.props.work ? true : false
      },
      hourlyRate: {
        fieldType: 'input',
        fieldConfig: { type: 'text', placeholder: '35' },
        value: this.props.work ? this.props.work.hourlyRate : 0,
        validation: { required: false },
        touched: false,
        valid: this.props.work ? true : false
      }
      // requestedDeletion: {
      //   fieldType: 'input',
      //   fieldConfig: { type: 'checkbox', checked: false },
      //   value: false,
      //   validation: { required: false },
      //   touched: false,
      //   valid: this.props.work ? true : false
      // }
      // media: {
      //   fieldType: 'input',
      //   fieldConfig: { type: 'file', multiple: true },
      //   value: this.props.work ? this.props.work.media : [],
      //   validation: { required: false },
      //   touched: false,
      //   valid: this.props.work ? true : false
      // }
    },
    messages: this.props.work ? this.props.work.messages : [],
    media: this.props.work ? this.props.work.media : [],
    requestedDate: this.props.work ? moment(this.props.work.requestedDate) : moment(),
    requestedDateFocused: false,
    scheduledFor: this.props.work ? moment(this.props.work.scheduledFor) : moment(),
    scheduledForFocused: false,
    partPurchasedDate: this.props.work ? moment(this.props.work.partPurchasedDate) : moment(),
    partPurchasedDateFocused: false,
    partArrivedDate: this.props.work ? moment(this.props.work.partArrivedDate) : moment(),
    partArrivedDateFocused: false,
    completedDate: this.props.work ? moment(this.props.work.completedDate) : moment(),
    completedDateFocused: false,
    createdAt: this.props.work ? moment(this.props.work.createdAt) : moment(),
    updatedAt: this.props.work ? moment(this.props.work.updatedAt) : moment(),
    formValid: false
  };

  componentDidMount() {
    // console.log(this.refs.WorkFormRef);
    this.getLocations();
    // this.getMedia();

    // console.log(this.props.locations[0]._id);
    // console.log(this.state.workForm.location.value);
  }

  getLocations = async () => {
    await this.props.readLocations();

    if (this.props.locations.length !== 0) {
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
      // return this.setState({ workForm, media });
    }
  };

  getMedia = async () => {
    if (this.props.work && this.props.work.media !== undefined) {
      // console.log(this.props.work.media);
      const files = await this.props.downloadMedia(this.props.work._id);
      console.log(files);
      return files;
    } else return;
  };

  updateField = (event, field) => {
    console.log(event.target);
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
    // console.log(this.state.workForm);
    return this.setState({ workForm, formValid });
  };

  onRequestedDateChange = requestedDate => this.setState({ requestedDate });
  onRequestedDateFocusChange = ({ focused: requestedDateFocused }) => this.setState({ requestedDateFocused });

  onScheduledForChange = scheduledFor => this.setState({ scheduledFor });
  onScheduledForFocusChange = ({ focused: scheduledForFocused }) => this.setState({ scheduledForFocused });

  onPartPurchasedDateChange = partPurchasedDate => this.setState({ partPurchasedDate });
  onPartPurchasedDateFocusChange = ({ focused: partPurchasedDateFocused }) => this.setState({ partPurchasedDateFocused });

  onPartArrivedDateChange = partArrivedDate => this.setState({ partArrivedDate });
  onPartArrivedDateFocusChange = ({ focused: partArrivedDateFocused }) => this.setState({ partArrivedDateFocused });

  onCompletedDateChange = completedDate => this.setState({ completedDate });
  onCompletedDateFocusChange = ({ focused: completedDateFocused }) => this.setState({ completedDateFocused });

  onFileUpload = event => {
    event.stopPropagation();
    event.preventDefault();
    console.log(event.target);

    return this.setState({ media: event.target.files });
    // return this.showUploading(event.target.files);
  };

  selectFiles = event => document.getElementById('media').click();

  onDownload = event => {
    const gallery = document.querySelector(classes.WorkFormGallery);
    const media = new FileReader();

    // console.log(event.target);
    gallery.src = media.result;
    gallery.alt = media.result;
    console.log(gallery.src);

    if (this.state.media > 0) {
      this.state.media.forEach(m => media.readAsDataURL(m));
    }
  };

  onUpload = event => {
    event.stopPropagation();
    event.preventDefault();
    this.props.uploadMedia(this.props.work._id, this.state.media);
  };

  // showUploading = files => {
  //   console.log(files);
  //   console.log(this.uploading);
  //   console.log(this.refs);

  //   if (files > 0) {
  //     return files.map(file => <li>{file}</li>);
  //   }
  // };

  onSubmit = event => {
    event.preventDefault();
    this.props.uploadMedia(this.props.work._id, this.state.media);

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
      // requestedDeletion: this.state.workForm.requestedDeletion.value,
      requestedDate: this.state.requestedDate,
      scheduledFor: this.state.scheduledFor,
      partPurchasedDate: this.state.partPurchasedDate,
      partArrivedDate: this.state.partArrivedDate,
      completedDate: this.state.completedDate,
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
        hourlyRate: this.state.workForm.hourlyRate.value
        // requestedDeletion: this.state.workForm.requestedDeletion.value
      },
      requestedDate: this.props.work ? moment(this.props.work.requestedDate) : moment(),
      scheduledFor: this.props.work ? moment(this.props.work.scheduledFor) : moment(),
      partPurchasedDate: this.props.work ? moment(this.props.work.partPurchasedDate) : moment(),
      partArrivedDate: this.props.work ? moment(this.props.work.partArrivedDate) : moment(),
      completedDate: this.props.work ? moment(this.props.work.completedDate) : moment(),
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
    console.log(this.state.workForm.status.value);
    let progress = this.props.work === undefined ? null : <ProgressBar progress={this.state.workForm.status.value} />;

    let form = <Spinner />;

    if (!this.props.loading) {
      // console.log(field.id, field.config.value);
      form = (
        <form className={classes.WorkForm} onSubmit={this.onSubmit} encType="multipart/form-data">
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
              <Input
                className={classes.WorkFormInputContainer}
                key={field.id}
                label={toTitleCase(field.id)}
                name={field.id}
                update={event => this.updateField(event, field.id)}
                fieldType={field.config.fieldType}
                fieldConfig={field.config.fieldConfig}
                // ref={field.id}
                value={field.config.value}
                validation={field.config.validation}
                touched={field.config.touched}
                invalid={!field.config.valid}
              />
            );
          })}

          <div className={classes.WorkFormRow}>
            <div className={classes.WorkFormInputContainer}>
              <label htmlFor="requested_date">Requested Date</label>
              <SingleDatePicker
                id="requested_date_input"
                date={this.state.requestedDate}
                onDateChange={this.onRequestedDateChange}
                focused={this.state.requestedDateFocused}
                onFocusChange={this.onRequestedDateFocusChange}
                numberOfMonths={1}
              />
            </div>

            <div className={classes.WorkFormInputContainer}>
              <label htmlFor="scheduled_for">Scheduled For</label>
              <SingleDatePicker
                id="scheduled_for_input"
                date={this.state.scheduledFor}
                onDateChange={this.onScheduledForChange}
                focused={this.state.scheduledForFocused}
                onFocusChange={this.onScheduledForFocusChange}
                numberOfMonths={1}
              />
            </div>

            <div className={classes.WorkFormInputContainer}>
              <label htmlFor="part_purchased_date">Part Purchase Date</label>
              <SingleDatePicker
                id="part_purchased_date_input"
                date={this.state.partPurchasedDate}
                onDateChange={this.onPartPurchasedDateChange}
                focused={this.state.partPurchasedDateFocused}
                onFocusChange={this.onPartPurchasedDateFocusChange}
                numberOfMonths={1}
              />
            </div>

            <div className={classes.WorkFormInputContainer}>
              <label htmlFor="part_arrived_date">Part Arrived Date</label>
              <SingleDatePicker
                id="part_arrived_date_input"
                date={this.state.partArrivedDate}
                onDateChange={this.onPartArrivedDateChange}
                focused={this.state.partArrivedDateFocused}
                onFocusChange={this.onPartArrivedDateFocusChange}
                numberOfMonths={1}
              />
            </div>

            <div className={classes.WorkFormInputContainer}>
              <label htmlFor="completed_date">Completed Date</label>
              <SingleDatePicker
                id="completed_date_input"
                date={this.state.completedDate}
                onDateChange={this.onCompletedDateChange}
                focused={this.state.completedDateFocused}
                onFocusChange={this.onCompletedDateFocusChange}
                numberOfMonths={1}
              />
            </div>
          </div>

          <div className={classes.WorkFormRow}>
            <div className={classes.WorkFormUpload}>
              <label htmlFor="media">
                <input id="media" name="media" type="file" onChange={this.onFileUpload} multiple />
              </label>
              <Button ButtonType="Upload" clicked={this.selectFiles} type="button">
                Choose Files
              </Button>
              <img className={classes.WorkFormGallery} onLoad={this.onDownload} alt={''} />
              {/* <Button ButtonType="Upload" clicked={this.onUpload} type="button">
                Upload Media
              </Button> */}
              {/* <div ref={uploading => (this.uploading = uploading)}>{this.showUploading()}</div> */}
            </div>
          </div>

          <div className={classes.WorkFormRow}>{this.state.media.map(m => <img src={m} height={200} width={200} alt={m} />)}</div>

          <div className={classes.WorkFormSubmitRow}>
            <Button ButtonType="Success" type="submit">
              Submit
            </Button>
            <Button ButtonType="Failure" clicked={this.onCancel} type="button">
              Cancel
            </Button>
          </div>
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
  media: state.work.media,
  loading: state.work.loading
});

const mapDispatchToProps = dispatch => ({
  readLocations: () => dispatch(actions.readLocations()),
  uploadMedia: (id, files) => dispatch(actions.uploadMedia(id, files)),
  downloadMedia: id => dispatch(actions.downloadMedia(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(handleErrors(WorkForm, api));

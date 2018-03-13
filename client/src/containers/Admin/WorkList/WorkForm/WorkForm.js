import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import Auxiliary from '../../../../hoc/Auxiliary';
import handleErrors from '../../../../hoc/handleErrors';

import Button from '../../../../components/UI/Button/Button';
import Fullscreen from '../../../../components/UI/Media/Fullscreen/Fullscreen';
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
    formValid: false,
    fullscreen: {
      active: false,
      content: null
    }
  };

  componentDidMount() {
    this.getLocations();
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
    }
  };

  updateField = (event, field) => {
    // console.log(event.target);
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
    // console.log(event.target);

    return this.setState({ media: event.target.files });
  };

  onUpload = event => {
    event.stopPropagation();
    event.preventDefault();
    this.props.uploadMedia(this.props.work._id, this.state.media);
  };

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

  openFullscreen = event => {
    event.preventDefault();
    // event.target.width = window.screen.availWidth * 0.8;
    // event.target.height = window.screen.availHeight * 0.8;
    // console.log(event.target);
    // console.log(document.images);

    let gallery = document.querySelector(`.${classes.WorkFormGalleryZoom}`);
    gallery.style.display = 'flex';
    gallery.style.height = '100%';
    gallery.style.width = '100%';
    gallery.style.marginLeft = '-120px';
    // gallery.style.transform = 'translateY(0)';
    // gallery.style.opacity = '1';

    let content = event.target;
    for (let image of document.images) {
      // console.log(`${image.currentSrc}: ${image.width} x ${image.height}`);
      if (event.target.src === image.currentSrc) {
        // console.log(`${event.target.src} === ${image.currentSrc}`);
        content.height = image.naturalHeight;
        content.width = image.naturalWidth;
      }
    }

    // console.log(content);

    return this.setState({
      fullscreen: {
        active: true,
        content
      }
    });
  };

  closeFullscreen = () => {
    let gallery = document.querySelector(`.${classes.WorkFormGalleryZoom}`);
    gallery.style.display = 'none';
    gallery.style.height = null;
    gallery.style.width = null;
    gallery.style.marginLeft = null;
    // gallery.style.transform = 'translateY(-100vh)';
    // gallery.style.opacity = '0';

    return this.setState({
      fullscreen: {
        active: false,
        content: null
      }
    });
  };

  renderGallery = media => {
    if (this.props.work)
      if (media === this.state.media && media.length > 0) {
        return media.map((m, i) => <img key={i} className={classes.WorkFormGalleryThumbnail} src={m} alt={m} onClick={this.openFullscreen} />);
      }
  };

  render() {
    let gallery = null;
    let fullscreen = null;
    let progress = null;
    let workFields = [];
    let form = <Spinner />;

    for (let key in this.state.workForm) {
      workFields.push({
        id: key,
        config: this.state.workForm[key]
      });
    }

    if (!this.props.loading) {
      // console.log(field.id, field.config.value);
      if (this.props.work) {
        gallery = <div className={classes.WorkFormGallery}>{this.renderGallery(this.props.work.media)}</div>;
        progress = <ProgressBar progress={this.state.workForm.status.value} />;
        fullscreen = (
          <div className={classes.WorkFormGalleryZoom}>
            <Fullscreen content={this.state.fullscreen.content} show={this.state.fullscreen.active} close={this.closeFullscreen} />
          </div>
        );
      }

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
              <Button ButtonType="Upload" clicked={this.onUpload} type="button">
                Choose Files
              </Button>
            </div>
          </div>

          <div className={classes.WorkFormRow}>{gallery}</div>

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
        {fullscreen}
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
  uploadMedia: (id, files) => dispatch(actions.uploadMedia(id, files))
});

export default connect(mapStateToProps, mapDispatchToProps)(handleErrors(WorkForm, api));

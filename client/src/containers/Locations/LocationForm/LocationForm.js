import api from '../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../../hoc/Auxiliary';
import handleErrors from '../../../hoc/handleErrors';

import AutocompleteWrapper from '../../../components/UI/Maps/Autocomplete/Autocomplete';
import Button from '../../../components/UI/Button/Button';
// import Input from '../../components/UI/Input/Input';

// import validateFields from '../../utils/validateFields';

import * as actions from '../../../actions';

import classes from './LocationForm.css';

class LocationForm extends Component {
  static defaultProps = {
    onSearch() {},
    onCancel() {}
  };

  state = {
    name: this.props.location ? this.props.location.name : '',
    location: null,
    lat: null,
    lng: null,
    phone: null
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSearch = (location, lat, lng, phone) => {
    return this.setState({
      location,
      lat,
      lng,
      phone: phone === undefined ? null : phone
    });
  };

  onSubmit = event => {
    event.preventDefault();
    console.log(this.state);

    return this.props.onSubmit({
      name: this.state.name,
      location: this.state.location,
      lat: this.state.lat,
      lng: this.state.lng,
      phone: this.state.phone
    });
  };

  onCancel = event => {
    this.props.onCancel();

    this.setState({
      name: this.props.location ? this.props.location.name : '',
      location: null,
      lat: null,
      lng: null,
      phone: null
    });
  };

  render() {
    return (
      <Auxiliary>
        <form>
          <div style={{ marginTop: '1.5rem' }}>
            <label htmlFor="name">
              Name
              <input
                id="name"
                className={classes.LocationFormControl}
                name="name"
                onChange={this.handleChange}
                type="text"
                value={this.state.name}
              />
            </label>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <AutocompleteWrapper onSearch={this.onSearch} />
          </div>
          <Button ButtonType="Success" clicked={this.onSubmit} type="button">
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
  handleErrors(LocationForm, api)
);

// class LocationForm extends Component {
//   static defaultProps = {
//     onCancel() {}
//   };

//   state = {
//     name: this.props.location ? this.props.location.name : '',
//     addressOne: this.props.location ? this.props.location.addressOne : '',
//     addressTwo: this.props.location ? this.props.location.addressTwo : '',
//     city: this.props.location ? this.props.location.city : '',
//     state: this.props.location ? this.props.location.state : '',
//     zipcode: this.props.location ? this.props.location.zipcode : ''
//   };

//   handleChange = event =>
//     this.setState({ [event.target.name]: event.target.value });

//   onSubmit = event => {
//     event.preventDefault();

//     this.props.onSubmit({
//       name: this.state.name,
//       addressOne: this.state.addressOne,
//       addressTwo: this.state.addressTwo,
//       city: this.state.city,
//       state: this.state.state,
//       zipcode: this.state.zipcode
//     });
//   };

//   onCancel = event => {
//     this.props.onCancel();

//     this.setState({
//       name: this.props.location ? this.props.location.name : '',
//       addressOne: this.props.location ? this.props.location.addressOne : '',
//       addressTwo: this.props.location ? this.props.location.addressTwo : '',
//       city: this.props.location ? this.props.location.city : '',
//       state: this.props.location ? this.props.location.state : '',
//       zipcode: this.props.location ? this.props.location.zipcode : ''
//     });
//   };

//   render() {
//     return (
//       <Auxiliary>
//         <form onSubmit={this.onSubmit}>
//           <div style={{ marginTop: '1.5rem' }}>
//             <label htmlFor="name">
//               Name
//               <input
//                 id="name"
//                 className={classes.LocationFormControl}
//                 name="name"
//                 onChange={this.handleChange}
//                 type="text"
//                 value={this.state.name}
//               />
//             </label>
//           </div>
//           <div style={{ marginTop: '1.5rem' }}>
//             <label htmlFor="address-one">
//               Address One
//               <input
//                 id="address-one"
//                 className={classes.LocationFormControl}
//                 name="addressOne"
//                 onChange={this.handleChange}
//                 type="text"
//                 value={this.state.addressOne}
//               />
//             </label>
//           </div>
//           <div style={{ marginTop: '1.5rem' }}>
//             <label htmlFor="address-two">
//               Address Two
//               <input
//                 id="address-two"
//                 className={classes.LocationFormControl}
//                 name="addressTwo"
//                 onChange={this.handleChange}
//                 type="text"
//                 value={this.state.addressTwo}
//               />
//             </label>
//           </div>
//           <div style={{ marginTop: '1.5rem' }}>
//             <label htmlFor="city">
//               City
//               <input
//                 id="city"
//                 className={classes.LocationFormControl}
//                 name="city"
//                 onChange={this.handleChange}
//                 type="text"
//                 value={this.state.city}
//               />
//             </label>
//           </div>
//           <div style={{ marginTop: '1.5rem' }}>
//             <label htmlFor="state">
//               State
//               <input
//                 id="state"
//                 className={classes.LocationFormControl}
//                 name="state"
//                 onChange={this.handleChange}
//                 type="text"
//                 value={this.state.state}
//               />
//             </label>
//           </div>
//           <div style={{ marginTop: '1.5rem' }}>
//             <label htmlFor="zipcode">
//               Zip Code
//               <input
//                 id="zipcode"
//                 className={classes.LocationFormControl}
//                 name="zipcode"
//                 onChange={this.handleChange}
//                 type="text"
//                 value={this.state.zipcode}
//               />
//             </label>
//           </div>
//           <Button ButtonType="Success" type="submit">
//             Submit
//           </Button>
//           <Button ButtonType="Failure" clicked={this.onCancel} type="button">
//             Cancel
//           </Button>
//         </form>
//       </Auxiliary>
//     );
//   }
// }

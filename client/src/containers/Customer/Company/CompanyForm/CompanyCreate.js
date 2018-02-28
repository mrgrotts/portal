import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import handleErrors from '../../../../hoc/handleErrors';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import CompanyForm from './CompanyForm';

import * as actions from '../../../../actions';

class CompanyCreate extends Component {
  onSubmit = async company => {
    await this.props.createCompany(company);
  };

  onCancel = () => {
    this.props.history.push('/');
  };

  render() {
    let form = <Spinner />;

    if (!this.props.loading) {
      form = <CompanyForm onSubmit={this.onSubmit} onCancel={this.onCancel} />;
    }

    const redirectAfterSubmit = this.props.success ? <Redirect to="/" /> : null;

    return (
      <div style={{ height: '100%', width: '100%' }}>
        {redirectAfterSubmit}
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create Company Form</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.company.loading,
  success: state.company.success
});

const mapDispatchToProps = dispatch => ({
  createCompany: company => dispatch(actions.createCompany(company))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(handleErrors(CompanyCreate, api)));

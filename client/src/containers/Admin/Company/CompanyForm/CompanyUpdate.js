import api from '../../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import handleErrors from '../../../../hoc/handleErrors';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import CompanyForm from './CompanyForm';

import * as actions from '../../../../actions';

class CompanyUpdate extends Component {
  updateCompany = async company => {
    await this.props.updateCompany(this.props.company._id, company);
  };

  onCancel = () => {
    this.props.history.push('/');
  };

  render() {
    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <CompanyForm
          onSubmit={this.updateCompany}
          onCancel={this.onCancel}
          company={this.props.company}
        />
      );
    }

    const redirectAfterSubmit = this.props.success ? (
      <Redirect to={`/companies/${this.props.company._id}`} />
    ) : null;

    return (
      <div style={{ height: '100%', width: '100%' }}>
        {redirectAfterSubmit}
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Update Company Form
        </h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  // company: state.company.company.find(
  //   company => company._id === props.match.params.companyId
  // ),
  company: state.company.company,
  userId: state.auth.userId,
  token: state.auth.token,
  loading: state.company.loading,
  success: state.company.success
});

const mapDispatchToProps = dispatch => ({
  updateCompany: (id, company) => dispatch(actions.updateCompany(id, company))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(handleErrors(CompanyUpdate, api))
);

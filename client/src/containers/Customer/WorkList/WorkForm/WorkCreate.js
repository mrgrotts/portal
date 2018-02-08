import api from "../../../../api";

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import handleErrors from "../../../../hoc/handleErrors";

import Spinner from "../../../../components/UI/Spinner/Spinner";
import WorkForm from "./WorkForm";

import * as actions from "../../../../actions";

class WorkCreate extends Component {
  onSubmit = async ticket => {
    await this.props.createWork(ticket);
  };

  onCancel = () => {
    this.props.history.push("/work");
  };

  render() {
    let form = <Spinner />;

    if (!this.props.loading) {
      form = <WorkForm onSubmit={this.onSubmit} onCancel={this.onCancel} />;
    }

    const redirectAfterSubmit = this.props.success ? (
      <Redirect to="/work" {...this.props.workList} />
    ) : null;

    return (
      <div>
        {redirectAfterSubmit}
        <h1>Create Work Form</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // id: state.auth.id,
  // token: state.auth.token,
  loading: state.workList.loading,
  success: state.workList.success
});

const mapDispatchToProps = dispatch => ({
  createWork: ticket => dispatch(actions.createWork(ticket))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(handleErrors(WorkCreate, api))
);

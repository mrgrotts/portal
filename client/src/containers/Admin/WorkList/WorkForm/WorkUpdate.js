import api from "../../../../api";

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import handleErrors from "../../../../hoc/handleErrors";

import Spinner from "../../../../components/UI/Spinner/Spinner";
import WorkForm from "./WorkForm";

import * as actions from "../../../../actions";

class WorkUpdate extends Component {
  updateWork = async ticket => {
    await this.props.updateWork(this.props.ticket._id, ticket);
  };

  onCancel = () => {
    this.props.history.push("/work");
  };

  render() {
    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <WorkForm
          onSubmit={this.updateWork}
          onCancel={this.onCancel}
          ticket={this.props.ticket}
        />
      );
    }

    const redirectAfterSubmit = this.props.success ? (
      <Redirect to="/work" />
    ) : null;

    return (
      <div>
        {redirectAfterSubmit}
        <h1>Update Work Form</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ticket: state.workList.workList.find(
    ticket => ticket._id === props.match.params.id
  ),
  id: state.auth.id,
  token: state.auth.token,
  loading: state.workList.loading,
  success: state.workList.success
});

const mapDispatchToProps = dispatch => ({
  updateWork: (id, ticket) => dispatch(actions.updateWork(id, ticket))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(handleErrors(WorkUpdate, api))
);

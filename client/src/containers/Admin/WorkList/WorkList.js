import api from '../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import handleErrors from '../../../hoc/handleErrors';

import Table from '../../../components/UI/Table/Table';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Work from './Work/Work';

import * as actions from '../../../actions';

import classes from './WorkList.css';

class WorkList extends Component {
  async componentDidMount() {
    await this.readWorkList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.workList !== this.props.workList || nextProps.children !== this.props.children;
  }

  readWorkList = async () => await this.props.readWorkList();

  deleteWork = async id => await this.props.deleteWork(id);

  render() {
    let workList = <Spinner />;

    if (!this.props.loading) {
      workList = this.props.workList.reverse().map(ticket => <Work key={ticket._id} {...ticket} delete={this.deleteWork.bind(this, ticket._id)} />);
    }

    let headers = ['Category', 'Number', 'Status', 'Location', 'Description', 'Date Received', 'Actions'];

    return (
      <div className={classes.WorkList}>
        <h1>You Have {workList.length} WorkList</h1>
        <Table headers={headers}>{workList}</Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workList: state.workList.workList,
  loading: state.workList.loading,
  token: state.auth.token,
  id: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  readWorkList: () => dispatch(actions.readWorkList()),
  deleteWork: id => dispatch(actions.deleteWork(id)),
  readLocation: id => dispatch(actions.readLocation(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(handleErrors(WorkList, api));

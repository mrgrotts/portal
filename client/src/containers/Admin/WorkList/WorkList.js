import api from '../../../api';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import handleErrors from '../../../hoc/handleErrors';

import Work from './Work/Work';

import Table from '../../../components/UI/Table/Table';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as actions from '../../../actions';

import classes from './WorkList.css';

class WorkList extends Component {
  async componentDidMount() {
    await this.readWorkList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.work !== this.props.work || nextProps.children !== this.props.children;
  }

  readWorkList = async () => await this.props.readWorkList();

  deleteWork = async id => await this.props.deleteWork(id);

  render() {
    let workList = <Spinner />;
    let title = `You Have ${workList.length} Work Orders`;
    let headers = ['Status', 'Category', 'Number', 'Location', 'Description', 'Date Received', 'Actions'];

    if (!this.props.loading) {
      workList = this.props.work.reverse().map(work => <Work key={work._id} {...work} delete={this.deleteWork.bind(this, work._id)} />);

      title = workList.length === 1 ? `You have ${workList.length} Work Order` : `You Have ${workList.length} Work Orders`;
    }

    return (
      <div className={classes.WorkList}>
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>{title}</h1>
        <Table headers={headers}>{workList}</Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  work: state.work.workList,
  loading: state.work.loading,
  token: state.auth.token,
  id: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  readWorkList: () => dispatch(actions.readWorkList()),
  deleteWork: id => dispatch(actions.deleteWork(id)),
  readLocation: id => dispatch(actions.readLocation(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(handleErrors(WorkList, api));

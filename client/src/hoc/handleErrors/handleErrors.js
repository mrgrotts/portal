import React, { Component } from 'react';

import Auxiliary from '../Auxiliary';

import Modal from '../../components/UI/Modal/Modal';

const handleErrors = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    // set up interceptors before child components render
    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });

        return req;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        res => res,
        error => this.setState({ error })
      );
    }

    componentWillUnmount() {
      console.log(
        '[Interceptor Unmount]',
        this.requestInterceptor,
        this.responseInterceptor
      );

      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    clearError = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Auxiliary>
          <Modal show={this.state.error} closeModal={this.clearError}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  };
};

export default handleErrors;

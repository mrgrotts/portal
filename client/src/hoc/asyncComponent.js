import React, { Component } from 'react';

// LAZYLOADING
// async modules
const asyncComponent = importComponent =>
  class extends Component {
    state = {
      component: null
    };

    componentDidMount() {
      importComponent().then(cmp => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;
      console.log(this.state.component);

      return C ? <C {...this.props} /> : null;
    }
  };

export default asyncComponent;

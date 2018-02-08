import React, { Component } from "react";

// LAZYLOADING
// async modules
const asyncComponent = importComponent =>
  class extends Component {
    state = {
      component: null,
      mounted: false
    };

    componentDidMount() {
      importComponent().then(component => {
        this.setState({ component: component.default, mounted: true });
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };

export default asyncComponent;

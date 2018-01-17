import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

import scriptCache from '../../utils/scriptCache';
import googleAPI from '../../utils/googleAPI';

// const defaultMapConfig = {};

const defaultCreateCache = options => {
  options = options || {};
  const apiKey = options.apiKey;
  const libraries = options.libraries || ['places'];
  const version = options.version || '3.31';
  const language = options.language || 'en';

  return scriptCache({
    google: googleAPI({
      apiKey,
      language,
      libraries,
      version
    })
  });
};

export const wrapper = options => WrappedComponent => {
  // const apiKey = options.apiKey;
  // const libraries = options.libraries || ['places'];
  // const version = options.version || '3';
  const createCache = options.createCache || defaultCreateCache;

  class Wrapper extends Component {
    constructor(props, context) {
      super(props, context);

      this.scriptCache = createCache(options);
      this.scriptCache.google.onLoad(this.onLoad.bind(this));

      this.state = {
        loaded: false,
        map: null,
        google: null
      };
    }

    onLoad(err, tag) {
      this._gapi = window.google;

      this.setState({ loaded: true, google: this._gapi });
    }

    render() {
      const style = { height: '100%', width: '100%' };

      const props = Object.assign({}, this.props, {
        loaded: this.state.loaded,
        google: window.google
      });

      return (
        <div style={style}>
          <WrappedComponent {...props} />
          <div ref="map" />
        </div>
      );
    }
  }

  return Wrapper;
};

export default wrapper;

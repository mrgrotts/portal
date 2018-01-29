import React, { Component } from 'react';

import { ScriptCache } from '../utils/scriptCache';
import googleAPI from '../utils/googleAPI';

const defaultCreateCache = options => {
  options = options || {};
  const apiKey = options.apiKey;
  const libraries = options.libraries || ['places'];
  const version = options.version || '3.31';
  const language = options.language || 'en';

  return ScriptCache({
    google: googleAPI({
      apiKey,
      language,
      libraries,
      version
    })
  });
};

export const wrapper = options => WrappedComponent => {
  const createCache = options.createCache || defaultCreateCache;

  return class Wrapper extends Component {
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
      this.googleApi = window.google;

      this.setState({ loaded: true, google: this.googleApi });
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
  };
};

export default wrapper;

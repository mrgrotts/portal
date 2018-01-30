import React from 'react';
import PropTypes from 'prop-types';

const eventNames = [
  'click',
  'dblclick',
  'dragend',
  'mousedown',
  'mouseout',
  'mouseover',
  'mouseup',
  'recenter'
];

const wrappedPromise = (wrappedPromise = {}) => {
  let promise = new Promise((resolve, reject) => {
    wrappedPromise.resolve = resolve;
    wrappedPromise.reject = reject;
  });

  wrappedPromise.then = promise.then.bind(promise);
  wrappedPromise.catch = promise.catch.bind(promise);
  wrappedPromise.promise = promise;

  return wrappedPromise;
};

export class Marker extends React.Component {
  static propTypes = {
    position: PropTypes.object,
    map: PropTypes.object
  };

  static defaultProps = {
    name: 'Marker'
  };

  async componentDidMount() {
    this.markerPromise = wrappedPromise();
    await this.renderMarker();
  }

  async componentDidUpdate(prevProps) {
    if (
      this.props.map !== prevProps.map ||
      this.props.position !== prevProps.position ||
      this.props.icon !== prevProps.icon
    ) {
      if (this.marker) {
        this.marker.setMap(null);
      }

      await this.renderMarker();
    }
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  async renderMarker() {
    let {
      map,
      google,
      position,
      mapCenter,
      icon,
      label,
      draggable,
      title
    } = this.props;

    if (!google) {
      return null;
    }

    let pos = position || mapCenter;
    if (!(pos instanceof google.maps.LatLng)) {
      position = await new google.maps.LatLng(pos.lat, pos.lng);
    }

    const pref = { map, position, icon, label, title, draggable };

    this.marker = await new google.maps.Marker(pref);

    eventNames.forEach(e => {
      this.marker.addListener(e, this.handleEvent(e));
    });

    await this.markerPromise.resolve(this.marker);
  }

  getMarker = () => this.markerPromise;

  handleEvent = event => e => {
    // console.log(event);
    let eName = event.split('')[0].toUpperCase() + event.slice(1);
    const eventName = `on${eName}`;
    // console.log(eventName);
    if (this.props[eventName]) {
      this.props[eventName](this.props, this.marker, e);
    }
  };

  render() {
    return null;
  }
}

eventNames.forEach(e => (Marker.propTypes[e] = PropTypes.func));

export default Marker;

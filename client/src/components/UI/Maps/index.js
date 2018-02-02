import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";

import { toCamelCase } from "../../../utils/transformString";
// import cancelablePromise from '../../../utils/cancelablePromise';

import classes from "./Map.css";

const eventNames = [
  "ready",
  "click",
  "dragend",
  "recenter",
  "bounds_changed",
  "center_changed",
  "dblclick",
  "dragstart",
  "heading_change",
  "idle",
  "maptypeid_changed",
  "mousemove",
  "mouseout",
  "mouseover",
  "projection_changed",
  "resize",
  "rightclick",
  "tilesloaded",
  "tilt_changed",
  "zoom_changed"
];

class Map extends Component {
  constructor(props) {
    super(props);

    this.listeners = {};
    this.state = {
      currentLocation: {
        // lat: this.props.initialCenter.lat,
        // lng: this.props.initialCenter.lng
        lat: this.props.center.lat,
        lng: this.props.center.lng
      }
    };
  }

  static propTypes = {
    id: PropTypes.string,
    google: PropTypes.object,
    zoom: PropTypes.number,
    centerAroundCurrentLocation: PropTypes.bool,
    center: PropTypes.object,
    // initialCenter: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    containerStyle: PropTypes.object,
    visible: PropTypes.bool,
    mapType: PropTypes.string,
    maxZoom: PropTypes.number,
    minZoom: PropTypes.number,
    clickableIcons: PropTypes.bool,
    disableDefaultUI: PropTypes.bool,
    zoomControlOptions: PropTypes.bool,
    mapTypeControl: PropTypes.bool,
    scaleControl: PropTypes.bool,
    streetViewControl: PropTypes.bool,
    panControl: PropTypes.bool,
    rotateControl: PropTypes.bool,
    scrollwheel: PropTypes.bool,
    draggable: PropTypes.bool,
    keyboardShortcuts: PropTypes.bool,
    disableDoubleClickZoom: PropTypes.bool,
    noClear: PropTypes.bool,
    styles: PropTypes.array,
    gestureHandling: PropTypes.string
  };

  static defaultProps = {
    zoom: 10,
    // initialCenter: {
    //   lat: 41.88,
    //   lng: -87.65
    // },
    center: {},
    centerAroundCurrentLocation: false,
    style: {},
    containerStyle: {},
    visible: true
  };

  // https://developers.google.com/maps/documentation/javascript/places#place_search_requests
  async componentDidMount() {
    // USING CURRENT LOCATION
    // if (this.props.centerAroundCurrentLocation) {
    //   if (navigator && navigator.geolocation) {
    //     this.geoPromise = cancelablePromise(new Promise((resolve, reject) => {
    //         navigator.geolocation.getCurrentPosition(resolve, reject);
    //       }));

    //     this.geoPromise.promise
    //       .then(pos => {
    //         const coords = pos.coords;
    //         this.setState({
    //           currentLocation: {
    //             lat: coords.latitude,
    //             lng: coords.longitude
    //           }
    //         });
    //       })
    //       .catch(e => e);
    //   }
    // }

    this.setState({
      currentLocation: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      }
    });
    // console.log('[componentDidMount]', this.state.currentLocation);
    await this.initMap();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('[componentDidUpdate]', prevProps.center, this.props.center);
    if (prevProps.google !== this.props.google) {
      this.initMap();
    }

    if (this.props.visible !== prevProps.visible) {
      this.restyleMap();
    }

    if (this.props.zoom !== prevProps.zoom) {
      this.map.setZoom(this.props.zoom);
    }

    if (this.props.center !== prevProps.center) {
      this.setState({
        currentLocation: {
          lat: this.props.center.lat,
          lng: this.props.center.lng
        }
      });
      // console.log(this.props.center);
      // console.log(this.state.currentLocation);
      this.recenterMap();
    }

    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps, nextState);
    // console.log('[shouldComponentUpdate]', nextProps.center, this.props.center);
    return (
      nextProps.center !== this.props.center ||
      nextProps.google !== this.props.google ||
      nextProps.children !== this.props.children
    );
  }

  componentWillUnmount() {
    // USING CURRENT LOCATION
    // if (this.geoPromise) {
    //   this.geoPromise.cancel();
    // }

    Object.keys(this.listeners).forEach(e => {
      this.props.google.maps.event.removeListener(this.listeners[e]);
    });
  }

  initMap = async () => {
    if (this.props && this.props.google) {
      const maps = this.props.google.maps;
      // const current = this.state.currentLocation;
      const current = this.props.center;
      const center = new maps.LatLng(current.lat, current.lng);
      const mapRef = this.refs.map;
      const node = findDOMNode(mapRef);

      const mapTypeIds = this.props.google.maps.MapTypeId || {};
      const mapTypeFromProps = String(this.props.mapType).toUpperCase();

      const mapConfig = Object.assign(
        {},
        {
          id: this.props.id,
          mapTypeId: mapTypeIds[mapTypeFromProps],
          center,
          zoom: this.props.zoom,
          maxZoom: this.props.maxZoom,
          minZoom: this.props.maxZoom,
          clickableIcons: !!this.props.clickableIcons,
          disableDefaultUI: this.props.disableDefaultUI,
          zoomControlOptions: this.props.zoomControlOptions || {
            position: maps.ControlPosition.RIGHT_CENTER
          },
          mapTypeControl: this.props.mapTypeControl,
          scaleControl: this.props.scaleControl,
          streetViewControl: this.props.streetViewControl,
          panControl: this.props.panControl,
          rotateControl: this.props.rotateControl,
          scrollwheel: this.props.scrollwheel,
          draggable: this.props.draggable,
          keyboardShortcuts: this.props.keyboardShortcuts,
          disableDoubleClickZoom: this.props.disableDoubleClickZoom,
          noClear: this.props.noClear,
          styles: this.props.styles,
          gestureHandling: this.props.gestureHandling
        }
      );

      Object.keys(mapConfig).forEach(key => {
        // Allow to configure mapConfig with 'false'
        if (mapConfig[key] === null) {
          delete mapConfig[key];
        }
      });

      this.map = new maps.Map(node, mapConfig);

      eventNames.forEach(e => {
        this.listeners[e] = this.map.addListener(e, this.handleEvent(e));
      });

      maps.event.trigger(this.map, "ready");
      this.forceUpdate();
    }
  };

  handleEvent(eventName) {
    let timeout;
    const handlerName = `on${toCamelCase(eventName)}`;

    return e => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 0);
    };
  }

  recenterMap = () => {
    const map = this.map;

    if (!this.props.google) {
      return;
    }

    const maps = this.props.google.maps;

    if (map) {
      // const current = this.state.currentLocation;
      let center = this.props.center;
      if (!(center instanceof this.props.google.maps.LatLng)) {
        center = new this.props.google.maps.LatLng(center.lat, center.lng);
      }
      // map.panTo(center)
      map.setCenter(center);
      maps.event.trigger(map, "recenter");
    }
  };

  restyleMap = () => {
    if (this.map) {
      this.props.google.maps.event.trigger(this.map, "resize");
    }
  };

  renderChildren = () => {
    if (!this.props.children) {
      return;
    }

    return React.Children.map(this.props.children, c => {
      if (!c) {
        return;
      }

      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapcenter: this.props.center
        // mapcenter: this.state.currentLocation
      });
    });
  };

  render() {
    const mapStyles = Object.assign({}, this.props.style, {
      display: this.props.visible ? "inherit" : "none"
    });

    const containerStyles = Object.assign({}, this.props.containerStyle);

    return (
      <div
        style={containerStyles}
        className={classes.MapContainer}
        id={this.props.id}>
        <div style={mapStyles} className={classes.Map} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

eventNames.forEach(e => (Map.propTypes[toCamelCase(e)] = PropTypes.func));

export default Map;

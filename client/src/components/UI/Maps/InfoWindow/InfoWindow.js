import { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';

export class InfoWindow extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    map: PropTypes.object,
    marker: PropTypes.object,
    position: PropTypes.object,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
  };

  static defaultProps = { visible: false };

  componentDidMount() {
    this.renderInfoWindow();
  }

  componentDidUpdate(prevProps) {
    const { google, map } = this.props;

    if (!google || !map) {
      return;
    }

    if (map !== prevProps.map) {
      this.renderInfoWindow();
    }

    if (this.props.position !== prevProps.position) {
      this.updatePosition();
    }

    if (this.props.children !== prevProps.children) {
      this.updateContent();
    }

    if (
      this.props.visible !== prevProps.visible ||
      this.props.marker !== prevProps.marker ||
      this.props.position !== prevProps.position
    ) {
      this.props.visible ? this.openWindow() : this.closeWindow();
    }
  }

  renderInfoWindow() {
    let { google } = this.props;

    if (!google || !google.maps) {
      return;
    }

    const iw = (this.infowindow = new google.maps.InfoWindow({
      content: ''
    }));

    google.maps.event.addListener(iw, 'closeclick', this.onClose.bind(this));
    google.maps.event.addListener(iw, 'domready', this.onOpen.bind(this));
  }

  onOpen = () => {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  };

  onClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  openWindow = () => this.infowindow.open(this.props.map, this.props.marker);

  updatePosition = () => {
    let { google, pos } = this.props;

    if (!(pos instanceof google.maps.LatLng)) {
      pos = pos && new google.maps.LatLng(pos.lat, pos.lng);
    }

    this.infowindow.setPosition(pos);
  };

  updateContent() {
    const content = this.renderChildren();
    this.infowindow.setContent(content);
  }

  closeWindow = () => this.infowindow.close();

  renderChildren = () => ReactDOMServer.renderToString(this.props.children);

  // renderChildren = () => {
  //   console.log(this.props.children.props.children.props.children);
  //   if (!this.props.children) {
  //     return;
  //   }

  //   return React.Children.map(
  //     this.props.children.props.children.props.children,
  //     c => {
  //       console.log(typeof c);
  //       if (!c) {
  //         return;
  //       }

  // return React.cloneElement(c, ...this.props);

  // return React.cloneElement(c, {
  //   infowindow: this.infowindow,
  //   google: this.props.google,
  //   map: this.props.map,
  //   marker: this.props.marker,
  //   onClose: this.props.onClose,
  //   onOpen: this.props.onOpen,
  //   position: this.props.position,
  //   visible: this.props.visibile
  // });
  //   }
  // );
  // };

  render() {
    return null;
  }
}

export default InfoWindow;

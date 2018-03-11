import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Fullscreen.css';

class Fullscreen extends Component {
  // only update component when Modal is toggled
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  renderMedia = content => {
    if (content === null) {
      return;
    }
    const height = content.height > window.screen.availHeight ? 1.0 : content.height;
    const width = content.width > window.screen.availWidth ? 1.0 : content.width;

    let media;
    switch (content.tagName) {
      case 'IMG':
        media = (
          <img className={classes.FullScreenImage} src={content.src} alt={content.alt} height={height} width={width} aspect="--aspect-ratio:2:1" />
        );
        break;
      default:
        media = null;
    }

    return media;
  };

  render() {
    return (
      <Auxiliary>
        <Backdrop show={this.props.show} clicked={this.props.close} />
        <div
          className={classes.Fullscreen}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.renderMedia(this.props.content)}
        </div>
      </Auxiliary>
    );
  }
}

export default Fullscreen;

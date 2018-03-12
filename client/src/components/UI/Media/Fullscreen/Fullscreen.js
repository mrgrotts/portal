import React, { Component } from 'react';

import Auxiliary from '../../../../hoc/Auxiliary';

import Backdrop from '../../Backdrop/Backdrop';

import classes from './Fullscreen.css';

class Fullscreen extends Component {
  // only update component when Modal is toggled
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children || nextProps.content !== this.props.content;
  }

  renderMedia = content => {
    if (content === null) {
      return;
    }
    console.log(content.naturalHeight);
    console.log(window.screen.availHeight);

    const height = content.naturalHeight > window.screen.availHeight ? window.screen.availHeight * 0.8 : content.naturalHeight;
    const width = content.naturalWidth > window.screen.availWidth ? window.screen.availWidth * 0.8 : content.naturalWidth;

    console.log(width, height);

    let media;
    switch (content.tagName) {
      case 'IMG':
        media = (
          <picture>
            <source
              className={classes.FullScreenImage}
              srcSet={content.src}
              height={height * 0.33}
              width={width * 0.33}
              media="(max-width: 500px)"
              aspect="--aspect-ratio:1:1"
            />
            <img className={classes.FullScreenImage} src={content.src} alt={content.alt} height={height} width={width} aspect="--aspect-ratio:2:1" />
          </picture>
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

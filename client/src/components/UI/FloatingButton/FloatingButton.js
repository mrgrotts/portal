import React, { PureComponent } from 'react';

import classes from './FloatingButton.css';

export default class FloatingButton extends PureComponent {
  state = {
    focused: false
  };

  onToggle = () => {
    // console.log('[onToggle]', this.state.focused);
    this.setState({ focused: !this.state.focused });
  };

  render() {
    return (
      <div>
        <button
          className={classes.FloatingButton}
          disabled={this.props.disabled}
          onClick={this.props.clicked}
          onMouseEnter={this.onToggle}
          onMouseLeave={this.onToggle}
          style={{
            transform: this.state.focused ? 'rotate(-225deg) scale(1.1)' : 'rotate(0) scale(1)'
          }}>
          <i className="material-icons">{this.props.children}</i>
        </button>
      </div>
    );
  }
}

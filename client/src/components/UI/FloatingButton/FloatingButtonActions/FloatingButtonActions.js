import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import classes from './FloatingButtonActions.css';

export default class FloatingButtonActions extends PureComponent {
  state = {
    focused: false
  };

  onToggle = () => {
    // console.log('[endHover]', this.state.focused);
    this.setState({ focused: !this.state.focused });
  };

  render() {
    let actions = [];

    for (let key in this.props.actions) {
      actions.push({
        id: key,
        config: this.props.actions[key]
      });
    }

    return (
      <ul
        className={classes.FloatingButtonActions}
        onMouseEnter={this.onToggle}
        onMouseLeave={this.onToggle}
        style={{
          transform: this.state.focused ? 'scale(0) translate(0, 0)' : 'scale(0.4) translate(0px, 40px)',
          opacity: this.state.focused ? '1' : '0'
        }}>
        {actions.map((a, i) => (
          <li key={i} id={a.id} onMouseOver={() => {}} onMouseOut={() => {}}>
            <label aria-describedby={a.config.tooltip} style={{}} title={a.config.tooltip} htmlFor={a.id}>
              <div>{a.config.tooltip}</div>
            </label>
            <Link key={a.id} className={[classes.FloatingButtonAction, a.id].join(' ')} to={a.config.action}>
              <i className="material-icons">{a.config.icon}</i>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

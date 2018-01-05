import React from 'react';

import classes from './Input.css';

const Input = props => {
  let field = null;
  const inputClasses = [classes.Field];

  if (props.invalid && props.validation && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  // these properties come from a form's state, like Customer.js
  switch (props.fieldType) {
    case 'input':
      field = (
        <input
          className={inputClasses.join(' ')}
          {...props.fieldConfig}
          value={props.value}
          onChange={props.update}
        />
      );
      break;
    case 'textarea':
      field = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.fieldConfig}
          value={props.value}
          onChange={props.update}
        />
      );
      break;
    case 'select':
      field = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.update}
        >
          {props.fieldConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    default:
      field = (
        <input
          className={inputClasses.join(' ')}
          {...props.fieldConfig}
          value={props.value}
          onChange={props.update}
        />
      );
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p className={classes.ValidationError}>{props.errorMessage}</p>
    );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {field}
      {validationError}
    </div>
  );
};

export default Input;

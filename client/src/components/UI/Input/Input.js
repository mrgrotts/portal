import React from 'react';

import classes from './Input.css';

const Input = props => {
  let field = null;
  const inputClasses = [classes.Field];
  const labelClasses = [classes.Label];

  if (props.invalid && props.validation && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  // these properties come from a form's state
  switch (props.fieldType) {
    case 'input':
      field = (
        <input
          id={props.name}
          className={inputClasses.join(' ')}
          {...props.fieldConfig}
          name={props.name}
          value={props.value}
          onChange={props.update}
        />
      );
      break;
    case 'textarea':
      field = (
        <textarea
          id={props.name}
          className={inputClasses.join(' ')}
          {...props.fieldConfig}
          name={props.name}
          value={props.value}
          onChange={props.update}
        />
      );
      break;
    case 'select':
      field = (
        <select id={props.name} className={inputClasses.join(' ')} name={props.name} value={props.value} onChange={props.update}>
          {props.fieldConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    case 'checkbox':
      field = (
        <div class="CheckboxContainer">
          <label class="CheckboxLabel">
            <input
              id={props.name}
              className={classes.Checkbox}
              {...props.fieldConfig}
              name={props.name}
              value={props.value}
              onChange={props.update}
            />
            <span class="CheckboxText">
              <span class="Check">
                <i class="fa fa-check icon" />
              </span>
            </span>
          </label>
        </div>
      );
      break;
    case 'file':
      inputClasses.push(classes.FileInput);
      // labelClasses.push(classes.FileUpload);

      field = (
        <input
          id={props.name}
          className={inputClasses.join(' ')}
          {...props.fieldConfig}
          name={props.name}
          value={props.value}
          onChange={props.update}
          multiple
        />
      );
      break;
    case 'button':
      field = (
        <input
          id={props.name}
          className={inputClasses.join(' ')}
          {...props.fieldConfig}
          name={props.name}
          value={props.value}
          onChange={props.update}
        />
      );
      break;
    default:
      field = (
        <input
          id={props.name}
          className={inputClasses.join(' ')}
          {...props.fieldConfig}
          name={props.name}
          value={props.value}
          onChange={props.update}
        />
      );
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;
  }

  let input =
    props.fieldConfig.type !== 'hidden' ? (
      <div className={classes.Input}>
        <label className={labelClasses.join(' ')} htmlFor={props.name}>
          {props.label}
        </label>
        {field}
        {validationError}
      </div>
    ) : null;

  return input;
};

export default Input;

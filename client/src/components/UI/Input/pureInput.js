import React, { PureComponent } from 'react';

import classes from './Input.css';

class Input extends PureComponent {
  render() {
    let field = null;
    const inputClasses = [classes.Field];
    const labelClasses = [classes.Label];

    if (this.props.invalid && this.props.validation && this.props.touched) {
      inputClasses.push(classes.Invalid);
    }

    // these properties come from a form's state
    switch (this.props.fieldType) {
      case 'input':
        field = (
          <input
            key={this.props.name}
            className={inputClasses.join(' ')}
            {...this.props.fieldConfig}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.update}
          />
        );
        break;
      case 'textarea':
        field = (
          <textarea
            key={this.props.name}
            className={inputClasses.join(' ')}
            {...this.props.fieldConfig}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.update}
          />
        );
        break;
      case 'select':
        field = (
          <select
            key={this.props.name}
            className={inputClasses.join(' ')}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.update}>
            {this.props.fieldConfig.options.map(option => (
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
                key={this.props.name}
                className={classes.Checkbox}
                {...this.props.fieldConfig}
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.update}
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
            key={this.props.name}
            className={inputClasses.join(' ')}
            {...this.props.fieldConfig}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.update}
            multiple
          />
        );
        break;
      case 'button':
        field = (
          <input
            key={this.props.name}
            className={inputClasses.join(' ')}
            {...this.props.fieldConfig}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.update}
          />
        );
        break;
      default:
        field = (
          <input
            key={this.props.name}
            className={inputClasses.join(' ')}
            {...this.props.fieldConfig}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.update}
          />
        );
    }

    let validationError = null;
    if (this.props.invalid && this.props.touched) {
      validationError = <p className={classes.ValidationError}>{this.props.errorMessage}</p>;
    }

    let input =
      this.props.fieldConfig.type !== 'hidden' ? (
        <div key={this.props.name} className={classes.Input}>
          <label className={labelClasses.join(' ')} htmlFor={this.props.name}>
            {this.props.label}
          </label>
          {field}
          {validationError}
        </div>
      ) : (
        this.props.value
      );

    return input;
  }
}

export default Input;

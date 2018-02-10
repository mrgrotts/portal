import React, { Component } from 'react';

import classes from './Input.css';

class Input extends Component {
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
            id={this.props.name}
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
            id={this.props.name}
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
            id={this.props.name}
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
      case 'file':
        inputClasses.push(classes.FileInput);
        labelClasses.push(classes.FileUpload);
        // const fileInputs = document.querySelectorAll(`.${classes.FileInput}`);
        // const fileUpload = document.querySelectorAll(`.${classes.FileUpload}`);
        // const fileUploadLabel = document.querySelectorAll(
        //   `label[for=${this.props.name}]`
        // );
        // console.log(fileInputs, fileUpload, fileUploadLabel);

        field = (
          <input
            id={this.props.name}
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
            id={this.props.name}
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
            id={this.props.name}
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
        <div className={classes.Input}>
          <label className={labelClasses.join(' ')} htmlFor={this.props.name}>
            {this.props.label}
          </label>
          {field}
          {validationError}
        </div>
      ) : null;

    return input;
  }
}

export default Input;

// inputClasses.push(classes.FileInput);

// const fileInputs = document.querySelectorAll(`.${classes.FileInput}`);
// const fileUpload = document.querySelectorAll(`.${classes.FileUpload}`);
// const fileUploadLabel = document.querySelectorAll(`label[for=${this.props.name}]`);
// console.log(fileInputs, fileUpload, fileUploadLabel);

// Array.prototype.forEach.call(fileInputs, input => {
//   let label = input.nextElementSibling;
//   let labelValue = label.innerHTML;

//   input.addEventListener("change", function(event) {
//     event.preventDefault();
//     let fileName = "";

//     if (this.files && this.files.length > 1) {
//       fileName = (
//         this.getAttribute("data-multiple-caption") || ""
//       ).replace("{count}", this.files.length);
//     } else {
//       fileName = event.target.value.split("\\").pop();
//     }

//     if (fileName) {
//       label.querySelector("span").innerHTML = fileName;
//     } else {
//       label.innerHTML = labelValue;
//     }
//   });
// });

// field = (
//   <div style={{ marginTop: "14px" }}>
//     <label className={classes.FileUpload}>
//       Upload Files
//       <input
//         id={this.props.name}
//         className={inputClasses.join(" ")}
//         {...this.props.fieldConfig}
//         name={this.props.name}
//         value={this.props.value}
//         onChange={this.props.update}
//         multiple
//         data-multiple-caption={"{count} files selected"}
//       />
//     </label>
//   </div>
// );

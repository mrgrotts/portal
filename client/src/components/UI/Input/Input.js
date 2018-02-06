import React from "react";

import classes from "./Input.css";

const Input = props => {
  let field = null;
  const inputClasses = [classes.Field];
  const labelClasses = [classes.Label];

  if (props.invalid && props.validation && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  // these properties come from a form's state, like Customer.js
  switch (props.fieldType) {
    case "input":
      field = (
        <input
          id={props.name}
          className={inputClasses.join(" ")}
          {...props.fieldConfig}
          name={props.name}
          value={props.value}
          onChange={props.update}
        />
      );
      break;
    case "textarea":
      field = (
        <textarea
          id={props.name}
          className={inputClasses.join(" ")}
          {...props.fieldConfig}
          name={props.name}
          value={props.value}
          onChange={props.update}
        />
      );
      break;
    case "select":
      field = (
        <select
          id={props.name}
          className={inputClasses.join(" ")}
          name={props.name}
          value={props.value}
          onChange={props.update}>
          {props.fieldConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    case "file":
      inputClasses.push(classes.FileInput);
      labelClasses.push(classes.FileUpload);

      // const fileInputs = document.querySelectorAll(`.${classes.FileInput}`);
      // const fileUpload = document.querySelectorAll(`.${classes.FileUpload}`);
      // const fileUploadLabel = document.querySelectorAll(
      //   `label[for=${props.name}]`
      // );
      // console.log(fileInputs, fileUpload, fileUploadLabel);

      field = (
        <input
          id={props.name}
          className={inputClasses.join(" ")}
          {...props.fieldConfig}
          name={props.name}
          value={props.value}
          onChange={props.update}
          multiple
        />
      );
      break;
    case "button":
      field = (
        <input
          id={props.name}
          className={inputClasses.join(" ")}
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
          className={inputClasses.join(" ")}
          {...props.fieldConfig}
          name={props.name}
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
      <label className={labelClasses.join(" ")} htmlFor={props.name}>
        {props.label}
      </label>
      {field}
      {validationError}
    </div>
  );
};

export default Input;

// inputClasses.push(classes.FileInput);

// const fileInputs = document.querySelectorAll(`.${classes.FileInput}`);
// const fileUpload = document.querySelectorAll(`.${classes.FileUpload}`);
// const fileUploadLabel = document.querySelectorAll(`label[for=${props.name}]`);
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
//         id={props.name}
//         className={inputClasses.join(" ")}
//         {...props.fieldConfig}
//         name={props.name}
//         value={props.value}
//         onChange={props.update}
//         multiple
//         data-multiple-caption={"{count} files selected"}
//       />
//     </label>
//   </div>
// );

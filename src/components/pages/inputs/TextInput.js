import React from "react";
import classes from "./Inputs.module.css";
import { Field, ErrorMessage } from "formik";

const TextInput = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className={classes.formControl}>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <div className={classes.errorinput}>
        {" "}
        <ErrorMessage name={name} component={props.ErrorMessage} />
      </div>
    </div>
  );
};

export default TextInput;
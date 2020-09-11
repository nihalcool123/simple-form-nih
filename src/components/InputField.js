import React, { useState, forwardRef, useImperativeHandle } from "react";

const InputField = forwardRef((props, ref) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = event => {
    setValue(event.target.value);
    setError("")
    props.onChange(event.target.name, event.target.value);
  };

  const validate = () => {
    if (props.validation) {
      const rules = props.validation.split("|");

      for (let i = 0; i < rules.length; ++i) {
        const current = rules[0];

        if (current === "required") {
          if (!value) {
            setError("This field is required");
            return false;
          }
        }
        const pair = current.split(":");
        switch (pair[0]) {
          case "min":
            if (value.length < pair[1]) {
              setError(
                `This field must be atleast ${pair[1]} characters long `
              );
              return false;
            }
            break;
          case "max":
            if (value.length > pair[1]) {
              setError(
                `This field must be no longer than ${pair[1]} characters long `
              );
              return false;
            }
            break;
          default:
            break;
        }
      }
    }
    return true
  };

  useImperativeHandle(ref, () => {
    return {
      validate: () => validate()
    };
  });

  return (
    <div className="input-wrapper">
      {props.label && <label>{props.label}</label>}
      <input
        placeholder={props.placeholder}
        name={props.name}
        onChange={event => handleChange(event)}
        type={props.type}
        value={props.value ? props.value : value}
        autoComplete={props.autoComplete}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
});

InputField.defaultProps = {
  placeholder: "",
  name: "",
  type: "text",
  value: "",
  autoComplete: "off",
  validation: ""
};

export default InputField;

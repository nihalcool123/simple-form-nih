import React, { useState, useRef } from "react";
import "./style.css";
import InputField from "./components/InputField";

export default function App() {
  const inputRefs = useRef([React.createRef(), React.createRef()]);
  const [data, setData] = useState({});

  const handleChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }));
  };
  console.log(inputRefs);

  const submitForm = e => {
    e.preventDefault();
    let isValid = true;

    for (let i = 0; i < inputRefs.current.length; ++i) {
      const valid = inputRefs.current[i].current.validate();
      console.log(valid);
      if (!isValid) {
        isValid = false;
      }
    }

    if(!isValid) {
      return
    }
    console.log("Loggedin")
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <InputField
          ref={inputRefs.current[0]}
          name="username"
          label="Username"
          onChange={handleChange}
          validation={"required|min:6|max:12"}
        />
        <InputField
          ref={inputRefs.current[1]}
          name="password"
          label="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

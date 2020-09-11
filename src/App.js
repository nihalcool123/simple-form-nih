import React, { useState, useRef } from "react";
import "./style.css";
import InputField from "./components/InputField";

export default function App() {
  const inputRefs = useRef([React.createRef(), React.createRef()]);
  const [data, setData] = useState({});

  const handleChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }));
  };
  console.log(data);

  return (
    <div>
      <form>
        <InputField
          ref={inputRefs}
          name="username"
          label="Username"
          onChange={handleChange}
        />
        <InputField
          ref={inputRefs}
          name="password"
          label="Password"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

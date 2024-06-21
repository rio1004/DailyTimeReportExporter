import { useState } from "react";

type InputProps = {
  type: string;
  style: string;
  value: string | number;
  error: string;
  placeHolder: string; 
  handleChange: (e:any) => void;
  label:string
};

const Input = (props: InputProps) => {
  return (
    // <div className="form-group" style={inputStyle}>
    <div className="form-group" style={{margin:"5px 0"}}>
      <p style={{margin:"10px 0"}}>
        {props.label} <span>*</span>
      </p>
      <div className="input-group">
        <input
          type={props.type}
          placeholder={props.placeHolder}
          value={props.value}
          onChange={props.handleChange}
        />
      </div>
      {/* {isErrUser ? (
        <p className="err">Tanga parang hindi developer! lagyan mo laman!</p>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default Input;

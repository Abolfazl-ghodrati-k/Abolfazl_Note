import React, { useState } from "react";

type Props = {
  id: string;
  type: string;
  label: string;
  error: string | false | undefined;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>
};

const Input = ({ id, type, label, error, value, setValue }: Props) => {
  
  return (
    <>
      <input
        className="form-group__input"
        type={type}
        id={id}
        placeholder={label}
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
      />
      {error && (
        <p
          className="form-group__errors"
          style={{
            fontSize: ".7rem",
            color: "#FFB02E",
            marginTop: "-.5rem",
            marginLeft: ".3rem",
          }}
        >
          {error}
        </p>
      )}
    </>
  );
};
export default Input;

import React, { FormEvent, useEffect } from "react";
import Input from "./Input";
import { ErrorTypo } from "../pages";

type Props = {
  mode: string;
  onSubmit: (e: FormEvent) => void;
  errors: ErrorTypo;
  Login_props: {
    username: string;
    Setusername: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    Setpassword: React.Dispatch<React.SetStateAction<string>>;
    pasRepeat: string;
    SetpasRepeat: React.Dispatch<React.SetStateAction<string>>;
  };
  seterrors: React.Dispatch<React.SetStateAction<ErrorTypo>>;
};

function LoginForm({ mode, onSubmit, errors, Login_props, seterrors }: Props) {

  return (
    <form onSubmit={onSubmit}>
      <div className="form-block__input-wrapper">
        {mode == "login" ? (
          <div className="form-group form-group--login">
            <Input
              type="text"
              id="username"
              value={Login_props.username}
              setValue={Login_props.Setusername}
              label="user name"
              error={mode == "login" && errors?.username}
            />
            <Input
              type="password"
              id="password"
              label="password"
              value={Login_props.password}
              setValue={Login_props.Setpassword}
              error={mode == "login" && errors?.password}
            />
          </div>
        ) : (
          <div className="form-group form-group--signup">
            <Input
              type="text"
              id="username"
              label="username"
              value={Login_props.username}
              setValue={Login_props.Setusername}
              error={mode == "signup" && errors?.username}
            />
            <Input
              type="password"
              id="createpassword"
              label="password"
              value={Login_props.password}
              setValue={Login_props.Setpassword}
              error={mode == "signup" && errors?.password}
            />
            <Input
              type="password"
              id="repeatpassword"
              label="repeat password"
              value={Login_props.pasRepeat}
              setValue={Login_props.SetpasRepeat}
              error={mode == "signup" && errors?.pasRepeat}
            />
          </div>
        )}
      </div>
      <button className="button button--primary full-width" type="submit">
        {mode === "login" ? "Log In" : "Sign Up"}
      </button>
      {mode === "login" ? (
        <button
          className="button button--secondary full-width"
          style={{ marginTop: "0.7rem", fontSize: ".8rem" }}
          type="submit"
        >
          Enter As Guest...
        </button>
      ) : null}
    </form>
  );
}

export default LoginForm;

import React, { useEffect, useState, FormEvent } from "react";
import LoginForm from "../components/LoginForm";
import { userService } from "../services/user-service";
import Router from "next/router";
import { User } from "./_types";

export type ErrorTypo = {
  username?: string;
  password?: string;
  pasRepeat?: string;
};

function LoginComponent() {
  const [mode, setmode] = useState("login");
  const [errors, seterrors] = useState<ErrorTypo>();
  const [username, Setusername] = useState<string>("");
  const [password, Setpassword] = useState<string>("");
  const [pasRepeat, SetpasRepeat] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<string>("");
  const [user, setuser] = useState<User>(userService.userValue)

  const Login_props = {
    username,
    password,
    pasRepeat,
    SetpasRepeat,
    Setpassword,
    Setusername,
  };

  function toggleMode() {
    var newMode = mode === "login" ? "signup" : "login";
    setmode(newMode);
  }

  useEffect(() => {
     Setusername("")
     Setpassword("")
     SetpasRepeat("")
     if(user?.token){
      Router.push('/home')
     }
  },[mode])

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const isValid = Validation(username, password);
    if (isValid) {
      setloading(true);
      if (mode == "signup") {
        const user = await userService.signup(username, password);
        setloading(false);
        if(user.message){
          seterror(user.message)
          setTimeout(() => {
            seterror("")
          },3000)
        } else {
          Router.push("/home")
        }
      } else if (mode == "login") {
        const user = await userService.login(username, password);
        setloading(false);
        if (user.token) {
          Router.push("/home");
        } else {
          seterror(user.message);
          setTimeout(() => {
            seterror("");
          }, 3000);
        }
      }
    } else {
      return;
    }
  }

  function Validation(username: string, password: string) {
    if (!username) {
      if (!password) {
        seterrors({
          username: "username required 🤨",
          password: "enter password after username",
        });
        return false;
      }
      if (password.length < 8) {
        seterrors({
          username: "username required 🤨",
          password: "password must br at least 8 chars!",
        });
        return false;
      }
    } else if (!password) {
      seterrors({ password: "password IS required dude !!!" });
      return false;
    }
    if (username.length < 4) {
      if (password.length > 7) {
        seterrors({ username: "username must be at least 4 chars" });
        return false;
      } else {
        seterrors({
          username: "username must be at least 4 chars",
          password: "password must be at least 8 chars",
        });
        return false;
      }
    } else if (password.length < 8) {
      seterrors({ password: "password must be at least 8 chars" });
      return false;
    }
    if (password != pasRepeat) {
      seterrors({ pasRepeat: "Entered Passwords Dont match!" });
      return false;
    }
    seterrors({ username: "", password: "", pasRepeat: "" });
    return true;
  }

  return (
    <div className={`app app--is-${mode}`}>
      <div
        className={`form-block-wrapper form-block-wrapper--is-${mode}`}
      ></div>
      <section className={`form-block form-block--is-${mode}`}>
        <header className="form-block__header">
          <h1>{mode === "login" ? "Welcome back!" : "Sign up"}</h1>
          <div className="form-block__toggle-block">
            <span>
              {mode === "login" ? "Don't" : "Already"} have an account? Click
              here &#8594;
            </span>
            <input id="form-toggler" type="checkbox" onClick={toggleMode} />
            <label htmlFor="form-toggler"></label>
          </div>
        </header>
        <LoginForm
          mode={mode}
          onSubmit={onSubmit}
          errors={errors}
          Login_props={Login_props}
          seterrors={seterrors}
        />
        {loading && <p>loading ...</p>}
        {error && (
          <p style={{ color: "#FFB02E", fontSize: ".8rem" }}>{error}</p>
        )}
      </section>
    </div>
  );
}

export default LoginComponent;

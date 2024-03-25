import React, { useEffect, useState, FormEvent, useRef } from "react";
import LoginForm from "../components/LoginForm";
import { userService } from "../services/user-service";
import Router from "next/router";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import useLoading from "../hooks/useLoading";

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
  const [error, setError] = useState<string>("");

  const Login_props = {
    username,
    password,
    pasRepeat,
    SetpasRepeat,
    Setpassword,
    Setusername,
  };

  function toggleMode() {
    var newMode = mode == "login" ? "signup" : "login";
    setmode(newMode);
  }

  const { startLoading, finishLoading } = useLoading();

  useEffect(() => {
    startLoading("Validating ...");
    resetForm()
    if (userService.userValue?.token || userService.userValue?.guest) {
      Router.push("/home");
    } else {
      finishLoading();
    }
  }, [mode]);

  function resetForm() {
    Setusername("");
    Setpassword("");
    SetpasRepeat("");
    setError("")
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const isValid = Validation(username, password);
    if (isValid) {
      if (mode == "signup") {
        startLoading("Signing up...✌️😒");
        const { user, message } = await userService.signup(username, password);
        if (!user) {
          setError(message ?? "Error occured on server see the log.");
        } else {
          Router.push("/home");
        }
        finishLoading();
      } else {
        startLoading("Logging in ... Welcome😁😘");
        const { user, message } = await userService.login(username, password);
        if (user) {
          // const { savedNotes, deletedNotes } = await recieveNotes();
          // localStorage.setItem("NOTES", JSON.stringify(savedNotes));
          // localStorage.setItem("DELETED_NOTES", JSON.stringify(deletedNotes));
          // Router.push("/home");
        } else {
          setError(message ?? "Error try again Later or enter as a guest");
        }
        // finishLoading();
      }
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
    if (mode == "signup" && password != pasRepeat) {
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
        {error && (
          <p style={{ color: "#FFB02E", fontSize: ".8rem", margin: "5px 0" }}>{error}</p>
        )}
      </section>
    </div>
  );
}

export async function recieveNotes() {
  const response = (await fetchWrapper.get<any>("/api/notes"));
  console.log(response)
  // const savedNotes = notes[0]?.Notes;
  // const deletedNotes = notes[0]?.deletedNotes;
  // return { savedNotes, deletedNotes };
}

export default LoginComponent;

import React, { useEffect, useState, FormEvent, useRef } from "react";
import LoginForm from "../components/LoginForm";
import { userService } from "../services/user-service";
import Router from "next/router";
import { Note, User } from "./_types";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import useLoading from "../hooks/useLoading";
import Image from "next/image";
// import usePwa from "../hooks/usePwa";

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
    console.log(userService.userValue);
    Setusername("");
    Setpassword("");
    SetpasRepeat("");
    if (userService.userValue?.token) {
      Router.push("/home");
    } else {
      finishLoading();
    }
  }, [mode]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const isValid = Validation(username, password);
    console.log(isValid);
    if (isValid) {
      if (mode == "signup") {
        startLoading("Signing up...✌️😒");
        const user = (await userService.signup(
          username,
          password
        )) as unknown as any;
        if (user.message) {
          seterror(user.message);
          setTimeout(() => {
            seterror("");
          }, 3000);
        } else {
          Router.push("/home");
          finishLoading();
        }
      } else {
        startLoading("Logging in ... Welcome😁😘");
        const user = (await userService.login(
          username,
          password
        )) as unknown as any;
        console.log(user);
        if (user.token) {
          const { savedNotes, deletedNotes } = await recieveNotes();
          localStorage.setItem("NOTES", JSON.stringify(savedNotes));
          localStorage.setItem("DELETED_NOTES", JSON.stringify(deletedNotes));
          Router.push("/home");
          finishLoading();
        } else {
          seterror(
            user.message
              ? user.message
              : user.code
              ? "Error try again Later or enter as a guest"
              : "Unknown Error!"
          );
          setTimeout(() => {
            seterror("");
          }, 3000);
        }
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
          <p style={{ color: "#FFB02E", fontSize: ".8rem" }}>{error}</p>
        )}
      </section>
    </div>
  );
}

export async function recieveNotes() {
  const notes = (await fetchWrapper.get("/api/notes")) as unknown as any;
  const savedNotes = notes[0]?.Notes;
  const deletedNotes = notes[0]?.deletedNotes;
  return { savedNotes, deletedNotes };
}




export default LoginComponent;

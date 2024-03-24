import React, { useEffect, useState, useCallback } from "react";
import type { AppProps } from "next/app";
import "../styles/global.scss";
import { userService } from "../services/user-service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { NextComponentType } from "next"; //Import Component type
import { observer } from "mobx-react-lite";
import { User } from "./_types";
import ContextWrapper from "../context/Loading";
import LoadingModal from "../modals/LoadingModal";
import Head from "next/head";
import useLoading from "../hooks/useLoading";
import Router, { useRouter } from "next/router";
import ConfiramtionModal from "../modals/ConfiramtionModal";
import ModalContextWrapper from "../context/Confirm";
import UnAuthorized from "./UnAuthorized";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

const App = observer(({ Component, pageProps }: CustomAppProps) => {
  return (
    <>
      <Head>
        <title>Abolfaz Note</title>
      </Head>

      <ModalContextWrapper>
        <ContextWrapper>
          <LoadingModal />
          <ConfiramtionModal />
          {Component.auth ? (
            <AuthControll>
              <Component {...pageProps} />
            </AuthControll>
          ) : (
            <Component {...pageProps} />
          )}
        </ContextWrapper>
      </ModalContextWrapper>
      <ToastContainer position="top-center" />
    </>
  );
});

export default App;

type Props = {
  children: React.ReactNode;
};

const AuthControll = ({ children }: Props) => {
  const [res, setres] = useState<any>();
  const [error, setError] = useState("");
  const { startLoading, finishLoading } = useLoading();

  useEffect(() => {
    startLoading("authenticating ...");
    setError("");
    const user = JSON.parse(localStorage.getItem("user")!) as User;
    authenticate(user).catch((err) => {
      if(typeof(err) === "string"){
        setError(err)
      }
      else {
        setError("Some thing went wrong, please  try again later.")
      }
    });
    finishLoading();
  }, []);

  const authenticate = useCallback(async (user: User) => {
    if (user?.guest) {
      setres(user);
    } else if (!user?.guest) {
      (await userService.getAll().then((response: any | unknown) => {
        if (response?.message?.username) {
          setres(response);
        } else {
          throw new Error("Authentication failed please login again.");
        }
      })) as unknown as any;
    }
  }, []);

  if(error) {
    userService.logout()
    return <UnAuthorized error={error} />
  }

  return res?.guest || (res?.message?.username && children);
};

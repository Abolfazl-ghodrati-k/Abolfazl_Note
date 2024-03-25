import React, { useEffect, useState, useCallback } from "react";
import type { AppProps } from "next/app";
import "../styles/global.scss";
import { userService } from "../services/user-service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { NextComponentType } from "next"; //Import Component type
import { observer } from "mobx-react-lite";
import { User } from "./_types";
import Head from "next/head";
import useLoading from "../hooks/useLoading";
import UnAuthorized from "./UnAuthorized";
import ErrorBoundary from "../hoc/ErrorBoundry";
import { ModalsProvider } from "../components/ModalsManager";
import ModalManager from "../managers/ModalManager";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

const App = observer(({ Component, pageProps }: CustomAppProps) => {
  return (
    <ErrorBoundary>
      <Head>
        <title>Abolfaz Note</title>
      </Head>

      <ModalsProvider>
          <ModalManager />
          {Component.auth ? (
            <AuthControll>
              <Component {...pageProps} />
            </AuthControll>
          ) : (
            <Component {...pageProps} />
          )}
      </ModalsProvider>
      <ToastContainer position="top-center" />
    </ ErrorBoundary>
  );
});

export default App;

type Props = {
  children: React.ReactNode;
};

const AuthControll = ({ children }: Props) => {
  const [error, setError] = useState("");
  const { startLoading, finishLoading } = useLoading();

  useEffect(() => {
    startLoading("authenticating ...");
    setError("");
    const user = JSON.parse(localStorage.getItem("user")!) as User;
    authenticate(user).catch((err) => {
      if (typeof err === "string") {
        setError(err);
      } else {
        setError("Some thing went wrong, please  try again later.");
      }
    });
    finishLoading();
  }, []);

  const authenticate = useCallback(async (user: User) => {
    if (user?.guest) {
      setError("");
    } else if (!user?.guest) {
      const response = await userService.getAll();
      if (response.ok) {
        setError("");
      } else {
        setError(response.message ?? "some error occured");
      }
    }
  }, []);

  if (error) {
    userService.logout();
    return <UnAuthorized error={error} />;
  }

  return <>{children}</>;
};

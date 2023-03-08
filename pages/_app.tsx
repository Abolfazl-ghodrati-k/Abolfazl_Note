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
            <AuthControll> <Component {...pageProps} />
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
  const { loading, startLoading, finishLoading } = useLoading();

  useEffect(() => {
    startLoading("authenticating ...");
    const user = JSON.parse(localStorage.getItem("user")!) as User;
    authenticate(user).catch((err) => console.error);
    finishLoading();
  }, []);

  const authenticate = useCallback(async (user: User) => {
    if (user?.guest) {
      setres(user);
    } else if (!user?.guest) {
      (await userService.getAll().then((response) => {
        if (response?.message?.username) {
          setres(response);
        } else {
          Router.push("/unAuthorized");
        }
        // console.log(response.message)
      })) as unknown as any;
    }
  }, []);

  if (loading) {
    return null;
  } else if (res?.user?.guest || res?.message?.username) {
    return <>{children}</>;
  } else {
    // userService.logout();
    return null;
  }
  //  if (res?.user?.guest) {
  //   return <>{children}</>;
  // } else if (res?.message?.username) {
  //   return <>{children}</>;
  // } else {
  //   userService.logout();
  //   return null;
  // }
};

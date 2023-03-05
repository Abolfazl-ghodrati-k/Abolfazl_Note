import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import "../styles/global.scss";
import { userService } from "../services/user-service";
import { ToastContainer } from "react-toastify";

// const  useLocalStorage = dynamic(() => import('../hooks/useLocalStorage'), { ssr: false })
// function urlBase64ToUint8Array(base64String: string): Uint8Array {
// 	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
// 	const base64 = (base64String + padding)
// 		.replace(/\-/g, "+")
// 		.replace(/_/g, "/");

// 	const rawData = window.atob(base64);
// 	const outputArray = new Uint8Array(rawData.length);

// 	for (let i = 0; i < rawData.length; ++i) {
// 		outputArray[i] = rawData.charCodeAt(i);
// 	}
// 	return outputArray;
// }

// async function send() {
// 	//register service worker
// 	const register = await navigator.serviceWorker.register("/sw.js");

// 	//register push
// 	const subscription = await register.pushManager.subscribe({
// 		userVisibleOnly: true,

// 		//public vapid key
// 		applicationServerKey: urlBase64ToUint8Array(
// 			"BAu-TfmAVhNAnp9-i1X-LDN9EkkaeIaH71gTXiWuqWsf2zag_XjCgd5RZYUHy1cPQCqG8m7FxDt4IAI0HEod5XM"
// 		),
// 	});

// 	//Send push notification
// 	await fetch("http://localhost:300/subscribe", {
// 		method: "POST",
// 		body: JSON.stringify(subscription),
// 		headers: {
// 			"content-type": "application/json",
// 		},
// 	});
// }

import type { NextComponentType } from "next"; //Import Component type
import { observer } from "mobx-react-lite";
import { User } from "./_types";

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

const App = observer(({ Component, pageProps }: CustomAppProps) => {
  // useEffect(() => {
  // 	// if ("serviceWorker" in navigator) {
  // 	// 	const  send = async() =>  {
  // 	// 		//register service worker
  // 	// 		const register = await navigator.serviceWorker.register(
  // 	// 			"/sw.js"
  // 	// 		);

  // 	// 		//register push
  // 	// 		const subscription = await register.pushManager.subscribe({
  // 	// 			userVisibleOnly: true,

  // 	// 			//public vapid key
  // 	// 			applicationServerKey:
  // 	// 				"BOJbNAs15gxY3Fj75-HbUzBEqyp7I40uG5yHSYIqRQYIf2b9MfZwod9g_Lb16GG2asT304tPTBMlcKAC_NXQj7g",
  // 	// 		});

  // 	// 		console.log("subscription: ", JSON.stringify(subscription));

  // 	// 		// //Send push notification
  // 	// 		// await fetch("http://localhost:3000/api/hello", {
  // 	// 		// 	method: "POST",
  // 	// 		// 	body: JSON.stringify(subscription),
  // 	// 		// 	headers: {
  // 	// 		// 		"content-type": "application/json",
  // 	// 		// 	},
  // 	// 		// });
  // 	// 	}

  // 	// 	send()
  // 	// 		.catch((err) => console.log("err",err))
  // 	// 		.then((res) => console.log("res",res));
  // 	// }
  // }, []);

  return (
    <>
      {Component.auth ? (
        <AuthControll>
          <Component {...pageProps} />
        </AuthControll>
      ) : (
        <Component {...pageProps} />
      )}
      <ToastContainer position="top-center" />
    </>
  );
});

export default App;

type Props = {
  children: React.ReactNode;
};

const AuthControll = ({ children }: Props) => {
  const [loading, setloading] = useState(true);
  const [res, setres] = useState<any>();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!) as User;
    if (user?.guest) {
      setloading(false);
      setres(user);
    } else if (!user?.guest) {
      userService.getAll().then((response) => {
        setloading(false);
        console.log(response);
        setres(response);
      }) as unknown as any;
    } else {
      setloading(false);
    }
  }, []);
  if (loading) {
    return <div>loading... please wait</div>;
  } else if (res?.user?.guest) {
    return <>{children}</>;
  } else if (res?.message?.username) {
    return <>{children}</>;
  } else {
    userService.logout();
    return null;
  }
};

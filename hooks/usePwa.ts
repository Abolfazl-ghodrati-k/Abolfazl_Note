import React, { useEffect, useState } from "react";

function usePwa() {
    const [register, setregister] = useState<ServiceWorkerRegistration>()
  useEffect(() => {
      console.log("im running")
    if ("serviceWorker" in navigator) {
      const send = async () => {
        //register service worker
        const Register = await navigator.serviceWorker.register("/sw.js");
        setregister(Register)
      };
      send()
    }
  }, []);

  return register;
}

export default usePwa;

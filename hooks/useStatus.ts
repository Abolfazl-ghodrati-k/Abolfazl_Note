import React, { useEffect, useState } from "react";
import { userService } from "../services/user-service";

function useStatus() {
  const [online, setonline] = useState(true);
  useEffect(() => {
    if (navigator.onLine && userService.userValue?.token) {
      setonline(true);
    } else {
      setonline(false);
    }
  }, []);
  return online;
}

export default useStatus;

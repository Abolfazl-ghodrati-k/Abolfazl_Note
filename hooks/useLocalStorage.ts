import React, { useState, useEffect } from "react";

const useLocalStorage = <T>(key: string, initialValue: T | (() => T)) => {


  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue == null) {
        if (jsonValue === "function") {
          return (initialValue as () => T)();
        } else {
          return initialValue;
        }
      } else {
        return JSON.parse(jsonValue);
      }
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
};

export default useLocalStorage;

import { useContext } from "react";
import { rootStoreContext } from "../store";

if(process.env.NODE_ENV == "development") {
    const { enableLogging } = require("mobx-logger")
    enableLogging()
}

export const useStore = () => useContext(rootStoreContext)
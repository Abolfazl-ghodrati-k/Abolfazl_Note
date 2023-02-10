import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import useLocalStorage from "../hooks/useLocalStorage";
import { User } from "../pages/_types";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/auth`;
// const [user, userSet] = useLocalStorage<User>("User", {} as User);
const userSubject = new BehaviorSubject(
  // user
  null
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  signup,
  logout,
  getAll,
};

async function login(username: string, password: string) {
  const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {
    username,
    password,
  });
  // publish user to subscribers and store in local storage to stay logged in between page refreshes
  userSubject.next(user);

  // userSet(user)
  
  return user;
}

async function signup(username: string, password: string) {
  const user = await fetchWrapper.post(`${baseUrl}/signup`, {
    username,
    password,
  });
  userSubject.next(user);
  // userSet(user)

  return user;
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  // userSet({} as User)
  userSubject.next(null);
  Router.push("/unAuthorized");
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

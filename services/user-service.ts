import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import useLocalStorage from "../hooks/useLocalStorage";
import { User } from "../pages/_types";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/auth`;
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
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

  localStorage.setItem('user', JSON.stringify(user));

  return user;
}

async function signup(username: string, password: string) {
  const user = await fetchWrapper.post(`${baseUrl}/signup`, {
    username,
    password,
  });
  userSubject.next(user);
  localStorage.setItem('user', JSON.stringify(user));

  return user;
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('user');
  userSubject.next(null);
  Router.push("/login");
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import {v4 as uuid} from "uuid"

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { User } from "../pages/_types";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `/api/auth`;
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user")!)
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  signup,
  logout,
  asGuest,
  getAll,
};

async function login(username: string, password: string) {
  const user = await fetchWrapper.post(`/api/auth/authenticate`, {
    username,
    password,
  }) as unknown as any 
  user.guest = false
  // publish user to subscribers and store in local storage to stay logged in between page refreshes
  userSubject.next(user);

  localStorage.setItem("user", JSON.stringify(user));

  return user;
}

function asGuest() {
  var user = {
    guest: true,
    username: "guest",
    token: uuid()
  };
  userSubject.next(user);
  localStorage.setItem("user", JSON.stringify(user));
}

async function signup(username: string, password: string) {
  const user = await fetchWrapper.post(`${baseUrl}/signup`, {
    username,
    password,
  }) as any;
  user.guest = false

  userSubject.next(user);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  process.browser && localStorage.removeItem("user");
  userSubject.next(null);
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

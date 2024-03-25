import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import { v4 as uuid } from "uuid";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { User } from "../pages/_types";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `/api/auth`;

const userSubject = new BehaviorSubject<User | null>(
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
  const response = await fetchWrapper.post<null | User>(
    `/api/auth/authenticate`,
    {
      username,
      password,
    }
  );

  if (!response?.data) {
    return { user: null, message: response?.message }
  }
  userSubject.next(response.data);

  localStorage.setItem("user", JSON.stringify(response.data));

  return { user: response.data, message: response?.message };
}

function asGuest() {
  var user = {
    guest: true,
    username: "guest",
  };
  userSubject.next(user);
  localStorage.setItem("user", JSON.stringify(user));
}

async function signup(username: string, password: string) {
  const response = await fetchWrapper.post<User | null>(`${baseUrl}/signup`, {
    username,
    password,
  });
  let user: null | User = null;

  if (response?.data) {
    user = response.data;
    user.guest = false;

    userSubject.next(user);
  }

  console.log(response);

  localStorage.setItem("user", JSON.stringify(user));

  return { user, message: response?.message };
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  process.browser && localStorage.removeItem("user");
  userSubject.next(null);
}

async function getAll() {
  const response = await fetchWrapper.get<User>(baseUrl);
  if (response) {
    return { message: response.message, ok: true };
  }
  return {
    message: "Some error happened try again later",
    ok: false,
  };
}

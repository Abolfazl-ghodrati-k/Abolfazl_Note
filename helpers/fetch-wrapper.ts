import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

import { userService } from "../services/user-service";

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
}

async function get<T>(url: string) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(url) as HeadersInit | undefined,
  };
  // return authHeader(url)
  return fetch(url, requestOptions).then((data) => data.json()).then(handleResponse<T>);
}

async function post<T>(url: string, body: {} | string) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authHeader(url) as HeadersInit | undefined),
    },
    credentials: "include" as RequestCredentials,
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then((data) => data.json()).then(handleResponse<T>);
}

async function put<T>(url: string, body: {} | string) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(authHeader(url) as HeadersInit | undefined),
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then((data) => data.json()).then(handleResponse<T>);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete<T>(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(url) as HeadersInit | undefined,
  };
  return fetch(url, requestOptions).then((data) => data.json()).then(handleResponse<T>);
}

// helper functions

function authHeader(url: string) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue;
  const isLoggedIn = user && user.token;
  // const isApiUrl = url.startsWith('/api');
  if (isLoggedIn) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

function handleResponse<T>(response: ApiResponse<T>) {
  console.log(response)
  if([401, 403, 400].includes(response.status)) {
    userService.logout()
    console.error(response)
    return null
  }

  return response
}

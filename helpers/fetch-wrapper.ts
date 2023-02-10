import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

import { userService } from "../services/user-service";
import Router from "next/router";
import { SimplifiedNote, User } from "../pages/_types";

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(url),
  };
  if (url == `${publicRuntimeConfig.apiUrl}/auth`) {
    return fetch(url, requestOptions).then(handleAuth);
  } else {
    return fetch(url, requestOptions).then(handleResponse);
  }
}

async function post(url: string, body: {} | string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    credentials: "include" as RequestCredentials,
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

async function put(url: string, body: {} | string) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url: string) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue;
  const isLoggedIn = user && user.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (true) {
    return { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFib2xmYXpsIiwiZmlyc3ROYW1lIjoiYWJvbGZhemwiLCJsYXN0TmFtZSI6Imdob2RyYXRpIiwiaWF0IjoxNjc2MDMyNjM1LCJleHAiOjE2Nzg2MjQ2MzV9.793U61pW78WAal4NAaoi1kLR-0IdxlhfH4vzIsm8Irs` };
  } else {
    return {};
  }
}

function handleAuth(response: any) {
    return response
}

function handleResponse(response: any) {
  return response;
  // return response.text().then(text => {
  //     const data = text && JSON.parse(text);

  //     if (!response.ok) {
  //         if ([401, 403].includes(response.status) && userService.userValue) {
  //             // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
  //             // userService.logout();
  //             // Router.push('/unAuthorized')
  //             return false
  //         }

  //         const error = (data && data.message) || response.statusText;
  //         return Promise.reject(error);
  //     }

  //     return data;
  // });
}

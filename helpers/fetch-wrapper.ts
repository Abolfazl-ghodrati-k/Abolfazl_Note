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

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(url) as HeadersInit | undefined,
  };
  // return authHeader(url)
  return timeoutPromise(10000,fetch(url, requestOptions).then(handleResponse))
  
}

async function post(url: string, body: {} | string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(url) as HeadersInit | undefined },
    credentials: "include" as RequestCredentials,
    body: JSON.stringify(body),
  };
  return timeoutPromise(10000,fetch(url, requestOptions).then(handleResponse))
}

async function put(url: string, body: {} | string) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url) as HeadersInit | undefined },
    body: JSON.stringify(body),
  };
  return timeoutPromise(10000,fetch(url, requestOptions).then(handleResponse))
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(url) as HeadersInit | undefined,
  };
  return timeoutPromise(10000,fetch(url, requestOptions).then(handleResponse))
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

function handleAuth(response: any) {
    return response
}
function timeoutPromise(ms: number | undefined= 10000, promise: Promise<unknown>) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject({message: "promise rejected"})
    }, ms);
    promise.then(
      (res: any) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err: any) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  }
)
}
function handleResponse(response: any) {
  // return response;
  return response.text().then((text: string) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
          if ([401, 403].includes(response.status)) {
              // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
              // userService.logout();
              // Router.push('/unAuthorized')
              return response
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
}

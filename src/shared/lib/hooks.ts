import { useState } from 'react';

export type JWTToken = string;

function getToken() {
  const stringToken = localStorage.getItem("accessToken");
  // const stringToken = null;
  if (stringToken === null) return undefined;

  // const userToken = JSON.parse(stringToken);
  // return userToken?.token;
  return stringToken;
}

function updateToken(stringToken: JWTToken) {
  localStorage.setItem("accessToken", stringToken);
  return stringToken;
}

export function useJWTToken() {
  const [token, setToken] = useState(getToken());

  function saveToken (userToken: string) {
    updateToken(userToken);
    setToken(userToken);
  }

  return {token, saveToken};
}
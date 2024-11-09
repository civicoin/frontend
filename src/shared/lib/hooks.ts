import { useState } from 'react';

type JWTToken = {
  token: string;
}

function getToken() {
  const tokenString = localStorage.getItem('token');
  // const tokenString = null;
  if (tokenString === null) return undefined;

  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

export function useJWTToken() {
  const [token, setToken] = useState(getToken());

  function saveToken (userToken: JWTToken) {
    // localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  }

  return [token, saveToken];
}
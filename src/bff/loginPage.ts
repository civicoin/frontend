
// TODO dummy function
export function login(username: string, password: string, remember: boolean) : Promise<boolean> {
  return new Promise((resolve) => {
    let loggedIn = false;
    if (remember) {
      loggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    }
    resolve(loggedIn);
  });
}
import React, { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './style.css'
import LoginForm from "./components/LoginForm";
import Header from "./components/Header.tsx";
import Main from "./pages/Main.tsx";

function checkLogin() {
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isLoggedIn = false;
  return isLoggedIn;
}

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(checkLogin());

  return (
      <div className={"h-full flex flex-col bg-background"}>
        <Header loggedIn={loggedIn} />
        {loggedIn ?
            <Main/> :
            <div className={"h-full flex flex-col items-center justify-center"}>
              <LoginForm onSubmit={setLoggedIn}></LoginForm>
            </div>
        }
      </div>
  )

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App

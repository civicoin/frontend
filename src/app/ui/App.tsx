import React from "react";
// import './App.css'
// import './output.css'
import './styles/style.css';
import Header from "../../shared/ui/components/Header.tsx";
import { Route, Routes, BrowserRouter, Outlet, useNavigate } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import SendPage from "@/pages/SendPage";
import { useJWTToken } from "@/shared/lib";
import { Button, Panel } from "@/shared/ui/components";

function LayoutWithHeaderAndAuthChecker() {
  const [token] = useJWTToken();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      {token !== undefined ? (
        <main className="h-full">
          <Outlet />
        </main>
      ) : (
        <Panel>
          <div className="my-8 mx-5 flex flex-col gap-y-4">
            <div className="text-4xl">It seems like you are logged out.</div>
            <Button onClick={() => navigate("/login")}>Sign in</Button>
          </div>
        </Panel>
      )}
      <main className="h-full">
        <Outlet />
      </main>
    </>
  );
}

const App: React.FC = () => {
  return (
    /** font family changed in tailwind config */
    <div className={"h-full bg-background"} style={{
      // fontFamily: "Montserrat"
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<LayoutWithHeaderAndAuthChecker />}>
            <Route index={true} element={<MainPage />} />
            <Route path="send" element={<SendPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

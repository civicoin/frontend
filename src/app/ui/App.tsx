import React, { type PropsWithChildren } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";

// import './App.css'
// import './output.css'
import './styles/style.css';
import Header from "@/shared/ui/components/Header.tsx";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import SendPage from "@/pages/SendPage";
import { Button, Panel } from "@/shared/ui/components";
import { NewSystemPage } from "@/pages/NewSystemPage";
import { StoreProvider } from "@/app/providers/StoreProvider";
import { useAppSelector } from "@/shared/lib";
import { getToken } from "@/shared/models/user.ts";
import { useTokenDecode as parseToken } from "@/shared/lib/hooks";
import { UserRole } from "@/shared/models";
import ErrorPage from "@/pages/ErrorPage";

function LayoutWithHeaderAndAuthChecker() {
  const token = useAppSelector(getToken);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      {token !== null ? (
        <main className="h-full">
          <Outlet />
        </main>
      ) : (
        <Panel>
          <div className="my-8 mx-5 flex flex-col gap-y-4">
            <div className="text-4xl">It seems like you are logged out.</div>
            <Button onClick={() => navigate("/login")}>Log in</Button>
          </div>
        </Panel>
      )}
    </>
  );
}

function ProtectedRoute({ allowedRoles, onError = ErrorPage }: PropsWithChildren & { allowedRoles: UserRole[], onError?: () => JSX.Element }) {
  const token = useAppSelector(getToken);
  if (!token) return <Navigate to="/unauthorized" replace />;

  const decodedData = parseToken(token);
  if (allowedRoles.includes(decodedData.role)) {
    return <Outlet />;
  } else {
    const ErrorPage = onError;
    return <ErrorPage />;
  }
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
          <Route path="/createSystem" element={<NewSystemPage />} />

          <Route path="/" element={<LayoutWithHeaderAndAuthChecker />}>
            <Route index={true} element={<MainPage />} />
            <Route element={<ProtectedRoute allowedRoles={[UserRole.MEMBER]} />}>
              <Route path="send" element={<SendPage />} />
            </Route>
            {/*<Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>*/}
            {/*  <Route path="send" element={<EmitPage />} />*/}
            {/*</Route>*/}
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
const AppWithStore: React.FC = () => (
    <StoreProvider>
      <App />
    </StoreProvider>
);

export default AppWithStore;

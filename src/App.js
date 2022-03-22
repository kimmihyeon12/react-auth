import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuthEffect } from "./hooks";
import { SignInPage, SignUpPage, UserDetailPage } from "./pages";

function AppRouter() {
  const { credentialsUser } = useAuthEffect();
  console.log("approuter");
  console.log(credentialsUser);
  return (
    <Routes>
      <Route
        path="/"
        element={<UserDetailPage user={credentialsUser} restricted={true} />}
      />
      <Route
        path="/login"
        element={<SignInPage user={credentialsUser} restricted={true} />}
      />
      <Route
        path="/signup"
        element={<SignUpPage user={credentialsUser} restricted={true} />}
      />
    </Routes>
  );
}

export default AppRouter;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SignInPage, SignUpPage, UserDetailPage } from "./pages";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<UserDetailPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default AppRouter;

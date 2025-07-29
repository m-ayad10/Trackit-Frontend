import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import SideBar from "./Components/SideBar/SideBar";
import Income from "./Pages/Income";
import Expense from "./Pages/Expense";
import OtpPage from "./Pages/Otp";
import { ProtectedRoute } from "../AuthMiddleware";

function UserLayout() {
  return (
    <SideBar>
      <Outlet />
    </SideBar>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="income" element={<Income />} />
              <Route path="expense" element={<Expense />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

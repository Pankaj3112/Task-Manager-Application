import React from "react";
import { useRecoilValue } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Dashboard, Login, Signup } from "./pages";
import { userSelector } from "./recoil";
import { ProtectLoginOrSignup, ProtectDashboard } from "./components";
import { Navbar } from "./components";

function App() {
  const user = useRecoilValue(userSelector);

  return (
    <Router>
      <Navbar />
	  <Toaster />
	  
      <Routes>
        <Route
          path="/signup"
          element={<ProtectLoginOrSignup RedirectTo={"/"} Component={<Signup/>} />}
        />
        <Route
          path="/login"
          element={<ProtectLoginOrSignup RedirectTo={"/"} Component={<Login/>} />}
        />
        <Route
          path="/"
          element={
            <ProtectDashboard RedirectTo={"/login"} Component={<Dashboard />} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

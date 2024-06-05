import { useState, useEffect } from "react";
import Home from "./components/Home/home";
import Profile from "./components/Profile/profile";
import Header from "./components/header/header";
import RegisterPage from "./components/register/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Page from "./components/page/page";
import ItemPage from "./components/itemPage/itemPage";

export default function App() {
  const [isAuth, setAuth] = useState(() => {
    const savedIsAuth = localStorage.getItem("isAuth");
    return savedIsAuth === "true";
  });

  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : {};
  });

  useEffect(() => {
    localStorage.setItem("isAuth", isAuth);
  }, [isAuth]);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <>
      <Router>
        <Header setAuth={setAuth} isAuth={isAuth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <RegisterPage
                setAuth={setAuth}
                userData={userData}
                setUserData={setUserData}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                setAuth={setAuth}
                userData={userData}
                setUserData={setUserData}
              />
            }
          />
          <Route
            path="/login"
            element={<Login setAuth={setAuth} setUserData={setUserData} />}
          />
          <Route path="/films" element={<Page route={'films'}/>} />
          <Route path="/serials" element={<Page route={'serials'}/>} />
          <Route path="/anime" element={<Page route={'anime'}/>} />
          <Route path="/films/:id" element={<ItemPage route={'films'}/>} />
          <Route path="/serials/:id" element={<ItemPage route={'serials'}/>} />
          <Route path="/anime/:id" element={<ItemPage route={'anime'}/>} />
        </Routes>
      </Router>
    </>
  );
}

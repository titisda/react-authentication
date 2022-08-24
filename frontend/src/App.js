import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import RedirectRoute from "./auth/RedirectRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserProfilePage from "./pages/UserProfilePage";

const App = () => {
  return (
    <>
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">User Profile</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<RedirectRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<UserProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;

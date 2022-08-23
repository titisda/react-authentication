import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import Login from "../components/Login/Login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    if (password.length < 3) {
      return setError("Password must be at least 3 characters.");
    }
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
  };

  // Watches the Error state and handles if there is no error
  useEffect(() => {
    if (password.length > 3) {
      return setError("");
    }
  }, [password]);

  return (
    <>
      <Login
        email={email}
        setEmail={(email) => setEmail(email)}
        password={password}
        handleLogin={handleLogin}
        setPassword={(password) => setPassword(password)}
      />
      {error && <Error error={error} />}
    </>
  );
};

export default LoginPage;

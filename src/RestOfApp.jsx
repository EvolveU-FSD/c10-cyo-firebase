import React from "react";
import { useAuth } from "./AuthProvider";
import Login from "./Login";

const RestOfApp = () => {
  const auth = useAuth();
  const user = auth.user;
  return (
    <div className="App">
      {user ? "you are logged in!" : "not logged in 😔"}
      <Login />
    </div>
  );
};

export default RestOfApp;

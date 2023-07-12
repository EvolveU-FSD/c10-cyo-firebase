import React from "react";
import { useAuth } from "./AuthProvider";
import HeroesCount from "./HeroesCount";
import HeroesList from "./HeroesList";
import HeroForm from "./HeroForm";
import Login from "./Login";

const RestOfApp = () => {
  const auth = useAuth();
  const user = auth.user;
  return (
    <div className="App">
      {user ? "you are logged in!" : "not logged in 😔"}
      <Login />
      <HeroForm />
      <HeroesList />
      <HeroesCount />
    </div>
  );
};

export default RestOfApp;

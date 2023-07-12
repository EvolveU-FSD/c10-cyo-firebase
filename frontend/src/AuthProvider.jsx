import React, { createContext, useContext, useEffect, useState } from "react";
import { useFirebase } from "./FirebaseProvider";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = (props) => {
  const children = props.children;
  const fb = useFirebase();
  const auth = fb.auth;
  const [user, setUser] = useState();
  const login = async (email, password) => {
    try {
      let userCred = await signInWithEmailAndPassword(auth, email, password);
      if (userCred) {
        console.log("Logged in!!", userCred.user);
      } else {
        console.log("Login failed!");
      }
    } catch (ex) {
      console.log("AUTH FAILURE!", ex.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged() - new User!!", user);
      setUser(user);
    });
    return unsub; // to shut down onAuthStateChanged listener
  }, [auth]);

  const theValue = { user, login, logout };
  return (
    <AuthContext.Provider value={theValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

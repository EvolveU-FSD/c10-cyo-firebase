import React, { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg8p9YCnofz_QXyBBNCOMjR81Uh91YqK8",
  authDomain: "c10-cyo-firebase.firebaseapp.com",
  projectId: "c10-cyo-firebase",
  storageBucket: "c10-cyo-firebase.appspot.com",
  messagingSenderId: "82674356932",
  appId: "1:82674356932:web:cfbe5cb1dfc86ce142af91",
};

const FirebaseProvider = (props) => {
  const children = props.children;
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const theValues = { app, auth };
  return (
    <FirebaseContext.Provider value={theValues}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

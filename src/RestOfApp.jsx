import React from "react";
import { useFirebase } from "./FirebaseProvider";

const RestOfApp = () => {
  const fb = useFirebase();
  const app = fb.app;
  return <div>App: {JSON.stringify(app)}</div>;
};

export default RestOfApp;

import "./App.css";
import AuthProvider from "./AuthProvider";
import FirebaseProvider from "./FirebaseProvider";
import RestOfApp from "./RestOfApp";

function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <RestOfApp />
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;

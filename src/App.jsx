import "./App.css";
import FirebaseProvider from "./FirebaseProvider";
import RestOfApp from "./RestOfApp";

function App() {
  return (
    <FirebaseProvider>
      <RestOfApp />
    </FirebaseProvider>
  );
}

export default App;

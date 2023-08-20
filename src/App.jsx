import { createContext, useState } from "react";
import Home from "./pages/Home";

export const AppContext = createContext(null);

function App() {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState([]);
  const [isOptions, setOptions] = useState(false);

  return (
    <AppContext.Provider
      value={{ url, setUrl, notes, setNotes, isOptions, setOptions }}
    >
      <Home></Home>
    </AppContext.Provider>
  );
}

AppContext.displayName = "AppContext";

export default App;

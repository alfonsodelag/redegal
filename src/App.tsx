import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Header } from "./components/header";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-blue-600">
      <Header />
    </div>
  );
}

export default App;
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Authentication from "./Pages/Authentication.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/Auth"} element={<Authentication />} />
      </Routes>
    </Router>
  );
}

export default App;

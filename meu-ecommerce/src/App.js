import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './UserContext';

import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";

function App() {
  return (
    <UserProvider>
      <Router>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

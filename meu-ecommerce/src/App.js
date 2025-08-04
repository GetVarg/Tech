import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './UserContext';

import Login from "./screens/LoginScreen";
import Register from "./screens/RegisterScreen";
import Home from "./screens/Home";
import Perfil from './screens/Perfil';
import Reviews from './screens/Reviews';

function App() {
  return (
    <UserProvider>
      <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/reviews' element={<Reviews />} />
          </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

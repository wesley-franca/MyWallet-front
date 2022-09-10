import LoginPage from "./content/LoginPage.js";
import RegistrationPage from "./content/RegistrationPage.js";
import Home from "./content/Home.js";
import AddNew from "./content/AddNew.js";

import "./assets/css/reset.css";
import Context from './tools/Context.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [profile, setProfile] = useState({});
  return (
    <Context.Provider value={[profile, setProfile]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />;
          <Route path="/cadastro" element={<RegistrationPage />} />;
          <Route path="/home" element={<Home />} />;
          <Route path="/home/entrada" element={<AddNew />} />;
          <Route path="/home/saida" element={<AddNew />} />;
        </Routes>
      </BrowserRouter>
    </Context.Provider>

  )
}

export default App;
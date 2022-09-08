import LoginPage from "./content/LoginPage.js";
import RegistrationPage from "./content/RegistrationPage.js";

import "./assets/css/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegistrationPage />} />
        </Routes>
    </BrowserRouter> 
)}

export default App;
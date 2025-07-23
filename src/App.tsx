import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "../src/pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import AboutUsPage from "./pages/AboutUsPage";
import DashboardPage from "./pages/DashboardPage.tsx";
import ProfessorPage from "./pages/ProfessorPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/professor" element={<ProfessorPage />} />
      </Routes>
    </>
  );
}

export default App;

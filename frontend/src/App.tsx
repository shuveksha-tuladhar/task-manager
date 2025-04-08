import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import Toast from "./components/Toast/Toast.tsx";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { setNavigate } from "./util/navigation.ts";
import Error401 from "./pages/Error401.tsx";
import Error403 from "./pages/Error403.tsx";
import Error500 from "./pages/Error500.tsx";

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <div className="flex flex-col h-full">
      <Header />
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/401" element={<Error401 />} />
        <Route path="/403" element={<Error403 />} />
        <Route path="/500" element={<Error500 />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

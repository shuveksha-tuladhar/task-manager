import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import Toast from "./components/Toast/Toast.tsx";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full">
        <Header />
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

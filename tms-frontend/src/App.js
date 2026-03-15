import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./index.css";
function Layout() {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
 
  return (
    <div className="app-wrapper">
      {!isAuthPage && <Navbar />}
      <div className={isAuthPage ? "" : "page-body"}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      {!isAuthPage && <Footer />}
    </div>
  );
}
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

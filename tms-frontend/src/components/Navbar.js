import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Navbar.css'

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/dashboard")}>
        <span className="navbar-logo">⬡</span>
        <div className="navbar-title">
          <span className="navbar-name">TMS</span>
          <span className="navbar-sub">Tender Management System</span>
        </div>
      </div>

      <div className="navbar-links">
        <button className="nav-link" onClick={() => navigate("/dashboard")}>Dashboard</button>
        {/* <button className="nav-link" onClick={() => navigate("/dashboard")}>Tenders</button> */}
      </div>

      <div className="navbar-right">
        {user && (
          <>
            <div className="navbar-user">
              <div className="navbar-avatar">
                  {user.photo ? (
                    <img
                      src={`http://localhost:8080/uploads/${user.photo}`}
                      alt="profile"
                      className="navbar-avatar-img"
                    />
                  ) : (
                    user.email?.[0]?.toUpperCase()
                  )}
                </div>
              <span className="navbar-email">{user.email}</span>
            </div>
            <button className="btn-nav-logout" onClick={handleLogout}>Sign Out</button>
          </>
        )}
      </div>
    </nav>
  );
}

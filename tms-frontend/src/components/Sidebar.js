import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Sidebar.css'
const navItems = [
  { icon: "⊞", label: "Dashboard", path: "/dashboard" },
  { icon: "📋", label: "Tenders", path: "/dashboard" },
];

export default function Sidebar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">⬡</span>
        <div>
          <div className="brand-name">TMS</div>
          <div className="brand-sub">Portal</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{user?.email?.[0]?.toUpperCase()}</div>
          <div className="user-details">
            <div className="user-email">{user?.email}</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Sign Out</button>
      </div>
    </aside>
  );
}

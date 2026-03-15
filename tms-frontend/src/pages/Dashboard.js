import './Dashboard.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllTenders, saveTender, updateTender, deleteTender, exportExcel } from "../services/api";
import TenderModal from "../components/TenderModal";

export default function Dashboard() {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTender, setEditTender] = useState(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchTenders();
  }, []);

  const fetchTenders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllTenders();
      setTenders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("getAllTenders error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async (formData, isEdit) => {
    try {
      if (isEdit) {
        const obj = {};
        formData.forEach((value, key) => {
          if (!(value instanceof File)) obj[key] = value;
        });
        await updateTender(editTender.id, obj);
        showToast("Tender updated successfully");
      } else {
        const result = await saveTender(formData);
        showToast(result || "Tender saved successfully");
      }
      fetchTenders();
      setModalOpen(false);
      setEditTender(null);
    } catch (err) {
      console.error("handleSave error:", err);
      showToast(err.message || "Operation failed", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tender?")) return;
    try {
      await deleteTender(id);
      showToast("Tender deleted successfully");
      fetchTenders();
    } catch (err) {
      showToast(err.message || "Delete failed", "error");
    }
  };

  const filtered = tenders.filter((t) =>
    [t.fullName, t.email, t.mobile, t.goodsType, t.city]
      .some((v) => v?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Tender Records</h1>
          <p>{tenders.length} total entries</p>
        </div>
        <div className="header-actions">
          <button className="btn-export" onClick={exportExcel}>↓ Export Excel</button>
          <button className="btn-primary" onClick={() => { setEditTender(null); setModalOpen(true); }}>
            + New Tender
          </button>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, email, city, goods type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="search-icon">⌕</span>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading tenders...</p>
        </div>

      ) : error ? (
        <div className="error-state">
          <span>⚠️</span>
          <p><strong>Could not load tenders</strong></p>
          <p className="error-detail">{error}</p>
          <div className="error-hints">
            <p>Please check:</p>
            <ul>
              <li>Spring Boot is running on <code>http://localhost:8080</code></li>
              <li>Database is connected and <code>tenders</code> table exists</li>
              <li>No CORS errors in browser console (F12)</li>
            </ul>
          </div>
          <button className="btn-retry" onClick={fetchTenders}>↺ Retry</button>
        </div>

      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span>📋</span>
          <p>{search ? "No results found for your search" : "No tenders yet. Click '+ New Tender' to add one!"}</p>
        </div>

      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Type</th>
                <th>City</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Goods Type</th>
                <th>Sale Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id}>
                  <td className="row-num">{i + 1}</td>
                  <td className="name-cell">{t.fullName}</td>
                  <td>
                    <span className={`badge badge-${t.type?.toLowerCase()}`}>{t.type || "—"}</span>
                  </td>
                  <td>{t.city || "—"}</td>
                  <td>{t.mobile}</td>
                  <td>{t.email}</td>
                  <td>{t.goodsType || "—"}</td>
                  <td>{t.saleRate || "—"}</td>
                  <td className="actions-cell">
                    <button className="btn-edit" onClick={() => { setEditTender(t); setModalOpen(true); }}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(t.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <TenderModal
          tender={editTender}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditTender(null); }}
        />
      )}

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}
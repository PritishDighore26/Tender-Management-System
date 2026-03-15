import './Footer.css'
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">⬡</span>
          <div>
            <div className="footer-name">TMS Portal</div>
            <div className="footer-tagline">Tender Management System</div>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Navigation</h4>
            <a href="/dashboard">Dashboard</a>
            {/* <a href="/dashboard">Tenders</a> */}
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
          <div className="footer-col">
            <h4>Features</h4>
            <span>Tender CRUD</span>
            <span>Excel Export</span>
            <span>Captcha Auth</span>
            <span>Live Search</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} TMS Portal. All rights reserved.</span>
        <span className="footer-stack">React • Spring Boot • MySQL</span>
      </div>
    </footer>
  );
}

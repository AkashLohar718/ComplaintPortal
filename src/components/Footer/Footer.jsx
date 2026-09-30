import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>ComplainX</h2>
          <p>
            A simple and transparent platform for registering
            and tracking complaints.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="footer-links">
          <h3>Support</h3>

          <Link to="/submit-complaint">Submit Complaint</Link>
          <Link to="/my-complaints">My Complaints</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 ComplainX. All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;
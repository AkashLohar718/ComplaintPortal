import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ role = "user" }) {
  const location = useLocation();

  const userLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Submit Complaint",
      path: "/submit-complaint",
    },
    {
      name: "My Complaints",
      path: "/my-complaints",
    },
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
    },
    {
      name: "Manage Complaints",
      path: "/manage-complaints",
    },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <h2>{role === "admin" ? "Admin Panel" : "User Panel"}</h2>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={
              location.pathname === link.path
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
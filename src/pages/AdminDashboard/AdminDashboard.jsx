import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import DashboardStats from "../../components/DashboardStats/DashboardStats";
import ComplaintCard from "../../components/ComplaintCard/ComplaintCard";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to access the admin dashboard.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get("/complaints/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComplaints(response.data.complaints);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load complaints."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) => complaint.status === "In-Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  return (
    <div>
      <DashboardLayout role="admin">

        <main className="admin-dashboard">
          <div className="admin-dashboard-container">

            <div className="admin-header">
              <div>
                <h1>Admin Dashboard</h1>
                <p>Monitor and manage all submitted complaints.</p>
              </div>

              <Link
                to="/manage-complaints"
                className="manage-btn"
              >
                Manage Complaints
              </Link>
            </div>

            {error && (
              <p className="form-error">{error}</p>
            )}

            <div className="admin-stats">
              <DashboardStats
                title="Total Complaints"
                value={totalComplaints}
              />

              <DashboardStats
                title="Pending"
                value={pendingComplaints}
              />

              <DashboardStats
                title="In-Progress"
                value={inProgressComplaints}
              />

              <DashboardStats
                title="Resolved"
                value={resolvedComplaints}
              />
            </div>

            <section className="admin-recent">

              <div className="section-header">
                <h2>Recent Complaints</h2>

                <Link to="/manage-complaints">
                  View All
                </Link>
              </div>

              {loading && (
                <p>Loading complaints...</p>
              )}

              {!loading && !error && complaints.length === 0 && (
                <p>No complaints found.</p>
              )}

              {!loading && !error && complaints.length > 0 && (
                <div className="admin-complaints-list">
                  {complaints.slice(0, 5).map((complaint) => (
                    <ComplaintCard
                      key={complaint._id}
                      complaint={complaint}
                    />
                  ))}
                </div>
              )}

            </section>

          </div>
        </main>

      </DashboardLayout>
    </div>
  );
}

export default AdminDashboard;
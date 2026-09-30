import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import DashboardStats from "../../components/DashboardStats/DashboardStats";
import ComplaintCard from "../../components/ComplaintCard/ComplaintCard";
import { COMPLAINTS } from "../../data/complaints";
import "./UserDashboard.css";

function UserDashboard() {

  const totalComplaints = COMPLAINTS.length;

  const pendingComplaints = COMPLAINTS.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const resolvedComplaints = COMPLAINTS.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  return (
    <div>

      <DashboardLayout role="user">

      <main className="user-dashboard">

        <div className="dashboard-header">
          <div>
            <h1>Welcome, User!</h1>
            <p>Track and manage your complaints from one place.</p>
          </div>

          <a href="/submit-complaint" className="submit-btn">
            + Submit Complaint
          </a>
        </div>


        {/* Statistics */}

        <div className="dashboard-stats">

          <DashboardStats
            title="Total Complaints"
            value={totalComplaints}
            type="total"
          />

          <DashboardStats
            title="Pending Complaints"
            value={pendingComplaints}
            type="pending"
          />

          <DashboardStats
            title="Resolved Complaints"
            value={resolvedComplaints}
            type="resolved"
          />

        </div>


        {/* Recent Complaints */}

        <section className="recent-section">

          <div className="section-title">
            <h2>Recent Complaints</h2>

            <a href="/my-complaints">
              View All
            </a>
          </div>

          <div className="complaints-list">

            {COMPLAINTS.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
              />
            ))}

          </div>

        </section>

      </main>
      </DashboardLayout>

    </div>
  );
}

export default UserDashboard;
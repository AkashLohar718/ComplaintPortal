import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import "./ComplaintDetails.css";

function ComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view this complaint.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(`/complaints/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComplaint(response.data.complaint);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load complaint details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className="complaint-details-page">
          <div className="complaint-details-container">
            <p>Loading complaint details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <main className="complaint-details-page">
          <div className="complaint-details-container">
            <p className="form-error">{error}</p>

            <Link to="/my-complaints" className="back-link">
              Back to My Complaints
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className="complaint-details-page">
        <div className="complaint-details-container">

          <div className="details-header">
            <div>
              <h1>Complaint Details</h1>
              <p>View complete information about your complaint.</p>
            </div>

            <span
              className={`status-badge ${complaint.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {complaint.status}
            </span>
          </div>

          <div className="details-card">

            <div className="detail-item">
              <span>Complaint ID</span>
              <strong>{complaint._id}</strong>
            </div>

            <div className="detail-item">
              <span>Title</span>
              <strong>{complaint.title}</strong>
            </div>

            <div className="detail-item">
              <span>Category</span>
              <strong>{complaint.category}</strong>
            </div>

            <div className="detail-item">
              <span>Priority</span>
              <strong>{complaint.priority}</strong>
            </div>

            <div className="detail-item">
              <span>Date Submitted</span>
              <strong>
                {new Date(complaint.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </strong>
            </div>

            <div className="detail-description">
              <span>Description</span>
              <p>{complaint.description}</p>
            </div>

            <div className="detail-remarks">
              <span>Admin Remarks</span>
              <p>
                {complaint.remarks || "No remarks added yet."}
              </p>
            </div>

          </div>

          <Link to="/my-complaints" className="back-link">
            ← Back to My Complaints
          </Link>

        </div>
      </main>
    </div>
  );
}

export default ComplaintDetails;
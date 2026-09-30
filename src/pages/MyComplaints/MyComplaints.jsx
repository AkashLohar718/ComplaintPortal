import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ComplaintCard from "../../components/ComplaintCard/ComplaintCard";
import API from "../../services/api";
import "./MyComplaints.css";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view your complaints.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get("/complaints/my", {
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

  return (
    <div>
      <Navbar />

      <main className="my-complaints-page">
        <div className="my-complaints-container">

          <div className="my-complaints-header">
            <div>
              <h1>My Complaints</h1>
              <p>
                View and track all your submitted complaints.
              </p>
            </div>

            <span className="complaint-count">
              {complaints.length} Complaints
            </span>
          </div>

          {loading && (
            <p>Loading complaints...</p>
          )}

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          {!loading && !error && complaints.length === 0 && (
            <p>No complaints found.</p>
          )}

          {!loading && !error && complaints.length > 0 && (
            <div className="complaints-list">
              {complaints.map((complaint) => (
                <ComplaintCard
                  key={complaint._id}
                  complaint={complaint}
                />
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default MyComplaints;
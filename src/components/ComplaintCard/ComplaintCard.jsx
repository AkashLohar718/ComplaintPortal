import { Link } from "react-router-dom";
import "./ComplaintCard.css";

function ComplaintCard({ complaint }) {
  // MongoDB uses _id and createdAt
  const complaintId = complaint._id || complaint.id;

  const complaintDate = complaint.createdAt
    ? new Date(complaint.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : complaint.date || "N/A";

  return (
    <div className="complaint-card">

      <div className="complaint-card-header">
        <div>
          <h3>{complaint.title}</h3>
          <p>Complaint ID: {complaintId}</p>
        </div>

        <span
          className={`status ${complaint.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {complaint.status}
        </span>
      </div>

      <div className="complaint-card-info">
        <span>Category: {complaint.category}</span>
        <span>Priority: {complaint.priority}</span>
        <span>Date: {complaintDate}</span>
      </div>

      <Link
        to={`/complaint/${complaintId}`}
        className="view-complaint"
      >
        View Details
      </Link>

    </div>
  );
}

export default ComplaintCard;
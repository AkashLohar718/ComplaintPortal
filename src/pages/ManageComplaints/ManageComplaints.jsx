import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import API from "../../services/api";
import "./ManageComplaints.css";

function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editRemarks, setEditRemarks] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch all complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to manage complaints.");
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

  // Search + filters
  const filteredComplaints = complaints.filter((complaint) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      complaint.title.toLowerCase().includes(search) ||
      complaint._id.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "" ||
      complaint.status === statusFilter;

    const matchesCategory =
      categoryFilter === "" ||
      complaint.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Start editing
  const startEditing = (complaint) => {
    setEditingId(complaint._id);
    setEditStatus(complaint.status);
    setEditRemarks(complaint.remarks || "");
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditStatus("");
    setEditRemarks("");
  };

  // Save changes to MongoDB
  const saveChanges = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login again.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await API.put(
        `/complaints/${id}`,
        {
          status: editStatus,
          remarks: editRemarks,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update complaint in the current UI
      setComplaints((currentComplaints) =>
        currentComplaints.map((complaint) =>
          complaint._id === id
            ? response.data.complaint
            : complaint
        )
      );

      cancelEditing();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update complaint."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="manage-page">
        <div className="manage-container">

          <div className="manage-header">
            <div>
              <h1>Manage Complaints</h1>
              <p>
                Review, update and manage submitted complaints.
              </p>
            </div>

            <div className="total-count">
              {filteredComplaints.length} Complaints
            </div>
          </div>

          {error && (
            <p className="form-error">{error}</p>
          )}

          {/* Filters */}

          <div className="filters-box">

            <div className="search-box">
              <label>Search</label>

              <input
                type="text"
                placeholder="Search by complaint ID or title..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>

            <div className="filter-group">
              <label>Status</label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In-Progress">
                  In-Progress
                </option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Category</label>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
              >
                <option value="">All Categories</option>
                <option value="Infrastructure">
                  Infrastructure
                </option>
                <option value="Cleanliness">
                  Cleanliness
                </option>
                <option value="Water Supply">
                  Water Supply
                </option>
                <option value="Electricity">
                  Electricity
                </option>
                <option value="Transport">
                  Transport
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          {/* Loading */}

          {loading && (
            <div className="no-results">
              <h2>Loading Complaints...</h2>
            </div>
          )}

          {/* Complaints */}

          {!loading && (
            <div className="manage-list">

              {filteredComplaints.length === 0 ? (
                <div className="no-results">
                  <h2>No Complaints Found</h2>
                  <p>
                    Try changing your search or filters.
                  </p>
                </div>
              ) : (
                filteredComplaints.map((complaint) => (

                  <div
                    className="manage-card"
                    key={complaint._id}
                  >

                    <div className="manage-card-header">

                      <div>
                        <span className="manage-id">
                          {complaint._id}
                        </span>

                        <h2>{complaint.title}</h2>
                      </div>

                      <StatusBadge
                        status={complaint.status}
                      />

                    </div>

                    <div className="manage-info">

                      <div>
                        <span>Category</span>
                        <strong>
                          {complaint.category}
                        </strong>
                      </div>

                      <div>
                        <span>Priority</span>
                        <strong>
                          {complaint.priority}
                        </strong>
                      </div>

                      <div>
                        <span>Date</span>
                        <strong>
                          {new Date(
                            complaint.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </strong>
                      </div>

                    </div>

                    <div className="manage-description">
                      <h3>Description</h3>
                      <p>{complaint.description}</p>
                    </div>

                    {editingId === complaint._id ? (

                      <div className="edit-area">

                        <div className="edit-field">
                          <label>
                            Update Status
                          </label>

                          <select
                            value={editStatus}
                            onChange={(e) =>
                              setEditStatus(
                                e.target.value
                              )
                            }
                          >
                            <option value="Pending">
                              Pending
                            </option>

                            <option value="In-Progress">
                              In-Progress
                            </option>

                            <option value="Resolved">
                              Resolved
                            </option>
                          </select>
                        </div>

                        <div className="edit-field">
                          <label>
                            Admin Remarks
                          </label>

                          <textarea
                            rows="4"
                            value={editRemarks}
                            onChange={(e) =>
                              setEditRemarks(
                                e.target.value
                              )
                            }
                            placeholder="Enter admin remarks..."
                          />
                        </div>

                        <div className="edit-actions">

                          <button
                            className="cancel-edit-btn"
                            onClick={cancelEditing}
                            disabled={saving}
                          >
                            Cancel
                          </button>

                          <button
                            className="save-btn"
                            onClick={() =>
                              saveChanges(
                                complaint._id
                              )
                            }
                            disabled={saving}
                          >
                            {saving
                              ? "Saving..."
                              : "Save Changes"}
                          </button>

                        </div>

                      </div>

                    ) : (

                      <div className="complaint-footer">

                        <div className="remarks">
                          <span>
                            Admin Remarks
                          </span>

                          <p>
                            {complaint.remarks ||
                              "No remarks added yet."}
                          </p>
                        </div>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            startEditing(complaint)
                          }
                        >
                          Update Complaint
                        </button>

                      </div>

                    )}

                  </div>

                ))
              )}

            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default ManageComplaints;